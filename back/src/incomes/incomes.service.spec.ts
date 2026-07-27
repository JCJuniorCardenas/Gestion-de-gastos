import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { PrismaService } from '../config/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

describe('IncomesService', () => {
  let service: IncomesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    income: {
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
        IncomesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<IncomesService>(IncomesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an income successfully', async () => {
      const userId = 'user-123';
      const createIncomeDto: CreateIncomeDto = {
        amount: 1500.0,
        description: 'Monthly salary',
        date: '2025-05-01',
      };

      const mockUser = { id: userId, email: 'test@example.com' };
      const mockIncome = {
        id: 'inc-123',
        amount: '1500.00',
        description: createIncomeDto.description,
        date: new Date('2025-05-01T12:00:00Z'),
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.income.create.mockResolvedValue(mockIncome);

      const result = await service.create(userId, createIncomeDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(mockPrismaService.income.create).toHaveBeenCalled();
      expect(result).toEqual(mockIncome);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 'nonexistent-user';
      const createIncomeDto: CreateIncomeDto = {
        amount: 1500.0,
        description: 'Monthly salary',
        date: '2025-05-01',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.create(userId, createIncomeDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all incomes for a user', async () => {
      const userId = 'user-123';
      const mockIncomes = [
        {
          id: 'inc-1',
          amount: '1500.00',
          description: 'Salary',
          date: new Date(),
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'inc-2',
          amount: '200.00',
          description: 'Freelance work',
          date: new Date(),
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.income.findMany.mockResolvedValue(mockIncomes);

      const result = await service.findAll(userId);

      expect(mockPrismaService.income.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { date: 'desc' },
      });
      expect(result).toEqual(mockIncomes);
      expect(result.length).toBe(2);
    });

    it('should return empty array if user has no incomes', async () => {
      const userId = 'user-123';

      mockPrismaService.income.findMany.mockResolvedValue([]);

      const result = await service.findAll(userId);

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a specific income', async () => {
      const incomeId = 'inc-123';
      const userId = 'user-123';
      const mockIncome = {
        id: incomeId,
        amount: '1500.00',
        description: 'Salary',
        date: new Date(),
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.income.findUnique.mockResolvedValue(mockIncome);

      const result = await service.findOne(incomeId, userId);

      expect(result).toEqual(mockIncome);
    });

    it('should throw NotFoundException if income does not exist', async () => {
      mockPrismaService.income.findUnique.mockResolvedValue(null);

      await expect(service.findOne('nonexistent', 'user-123')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user does not own the income', async () => {
      const mockIncome = {
        id: 'inc-123',
        amount: '1500.00',
        description: 'Salary',
        date: new Date(),
        userId: 'other-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.income.findUnique.mockResolvedValue(mockIncome);

      await expect(service.findOne('inc-123', 'user-123')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('update', () => {
    it('should update an income', async () => {
      const incomeId = 'inc-123';
      const userId = 'user-123';
      const updateIncomeDto: UpdateIncomeDto = {
        amount: 1600.0,
        description: 'Updated salary',
      };

      const mockIncome = {
        id: incomeId,
        amount: '1500.00',
        description: 'Salary',
        date: new Date(),
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedIncome = {
        ...mockIncome,
        amount: '1600.00',
        description: 'Updated salary',
        updatedAt: new Date(),
      };

      mockPrismaService.income.findUnique.mockResolvedValue(mockIncome);
      mockPrismaService.income.update.mockResolvedValue(updatedIncome);

      const result = await service.update(incomeId, userId, updateIncomeDto);

      expect(mockPrismaService.income.update).toHaveBeenCalled();
      expect(result.description).toBe('Updated salary');
    });
  });

  describe('remove', () => {
    it('should delete an income', async () => {
      const incomeId = 'inc-123';
      const userId = 'user-123';

      const mockIncome = {
        id: incomeId,
        amount: '1500.00',
        description: 'Salary',
        date: new Date(),
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.income.findUnique.mockResolvedValue(mockIncome);
      mockPrismaService.income.delete.mockResolvedValue(mockIncome);

      const result = await service.remove(incomeId, userId);

      expect(mockPrismaService.income.delete).toHaveBeenCalledWith({
        where: { id: incomeId },
      });
      expect(result).toEqual(mockIncome);
    });

    it('should throw ForbiddenException if user does not own income', async () => {
      const incomeId = 'inc-123';
      const userId = 'user-123';

      const mockIncome = {
        id: incomeId,
        amount: '1500.00',
        description: 'Salary',
        date: new Date(),
        userId: 'other-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.income.findUnique.mockResolvedValue(mockIncome);

      await expect(service.remove(incomeId, userId)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
