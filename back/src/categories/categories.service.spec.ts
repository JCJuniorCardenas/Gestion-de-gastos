import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../config/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a category successfully', async () => {
      const userId = 'user-123';
      const createCategoryDto: CreateCategoryDto = {
        name: 'Food',
        description: 'Food and groceries',
      };

      const mockCategory = {
        id: 'cat-123',
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.create.mockResolvedValue(mockCategory);

      const result = await service.create(userId, createCategoryDto);

      expect(mockPrismaService.category.create).toHaveBeenCalledWith({
        data: {
          name: createCategoryDto.name,
          description: createCategoryDto.description,
          userId,
        },
      });
      expect(result).toEqual(mockCategory);
    });

    it('should create category without description', async () => {
      const userId = 'user-123';
      const createCategoryDto: CreateCategoryDto = {
        name: 'Food',
      };

      const mockCategory = {
        id: 'cat-123',
        name: createCategoryDto.name,
        description: undefined,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.create.mockResolvedValue(mockCategory);

      const result = await service.create(userId, createCategoryDto);

      expect(result.name).toBe('Food');
    });
  });

  describe('findAll', () => {
    it('should return all categories for a user ordered by name', async () => {
      const userId = 'user-123';
      const mockCategories = [
        {
          id: 'cat-1',
          name: 'Entertainment',
          description: 'Entertainment costs',
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'cat-2',
          name: 'Food',
          description: 'Food and groceries',
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'cat-3',
          name: 'Transport',
          description: 'Transportation costs',
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.category.findMany.mockResolvedValue(mockCategories);

      const result = await service.findAll(userId);

      expect(mockPrismaService.category.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(mockCategories);
      expect(result.length).toBe(3);
    });

    it('should return empty array if user has no categories', async () => {
      const userId = 'user-123';

      mockPrismaService.category.findMany.mockResolvedValue([]);

      const result = await service.findAll(userId);

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a specific category', async () => {
      const categoryId = 'cat-123';
      const userId = 'user-123';
      const mockCategory = {
        id: categoryId,
        name: 'Food',
        description: 'Food and groceries',
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);

      const result = await service.findOne(categoryId, userId);

      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException if category does not exist', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(null);

      await expect(service.findOne('nonexistent', 'user-123')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user does not own the category', async () => {
      const mockCategory = {
        id: 'cat-123',
        name: 'Food',
        description: 'Food and groceries',
        userId: 'other-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);

      await expect(service.findOne('cat-123', 'user-123')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const categoryId = 'cat-123';
      const userId = 'user-123';
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated Food Category',
        description: 'Updated description',
      };

      const mockCategory = {
        id: categoryId,
        name: 'Food',
        description: 'Food and groceries',
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedCategory = {
        ...mockCategory,
        name: 'Updated Food Category',
        description: 'Updated description',
        updatedAt: new Date(),
      };

      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaService.category.update.mockResolvedValue(updatedCategory);

      const result = await service.update(
        categoryId,
        userId,
        updateCategoryDto,
      );

      expect(mockPrismaService.category.update).toHaveBeenCalled();
      expect(result.name).toBe('Updated Food Category');
    });

    it('should throw ForbiddenException if user does not own category', async () => {
      const categoryId = 'cat-123';
      const userId = 'user-123';
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated',
      };

      const mockCategory = {
        id: categoryId,
        name: 'Food',
        description: 'Food and groceries',
        userId: 'other-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);

      await expect(
        service.update(categoryId, userId, updateCategoryDto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      const categoryId = 'cat-123';
      const userId = 'user-123';

      const mockCategory = {
        id: categoryId,
        name: 'Food',
        description: 'Food and groceries',
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaService.category.delete.mockResolvedValue(mockCategory);

      const result = await service.remove(categoryId, userId);

      expect(mockPrismaService.category.delete).toHaveBeenCalledWith({
        where: { id: categoryId },
      });
      expect(result).toEqual(mockCategory);
    });

    it('should throw ForbiddenException if user does not own category', async () => {
      const categoryId = 'cat-123';
      const userId = 'user-123';

      const mockCategory = {
        id: categoryId,
        name: 'Food',
        description: 'Food and groceries',
        userId: 'other-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);

      await expect(service.remove(categoryId, userId)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
