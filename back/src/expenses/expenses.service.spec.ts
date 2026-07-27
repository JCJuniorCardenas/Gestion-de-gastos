import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { PrismaService } from '../config/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    expense: {
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
        ExpensesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an expense successfully', async () => {
      const userId = 'user-123';
      const createExpenseDto: CreateExpenseDto = {
        amount: 50.5,
        description: 'Grocery shopping',
        date: '2025-05-19',
        categoryId: 'cat-123',
      };

      const mockUser = { id: userId, email: 'test@example.com' };
      const mockExpense = {
        id: 'exp-123',
        amount: '50.50',
        description: createExpenseDto.description,
        date: new Date('2025-05-19T12:00:00Z'),
        categoryId: createExpenseDto.categoryId,
        userId,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: null,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.expense.create.mockResolvedValue(mockExpense);

      const result = await service.create(userId, createExpenseDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(mockPrismaService.expense.create).toHaveBeenCalled();
      expect(result).toEqual(mockExpense);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 'nonexistent-user';
      const createExpenseDto: CreateExpenseDto = {
        amount: 50.5,
        description: 'Grocery shopping',
        date: '2025-05-19',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.create(userId, createExpenseDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all expenses for a user', async () => {
      const userId = 'user-123';
      const mockExpenses = [
        {
          id: 'exp-1',
          amount: '50.00',
          description: 'Expense 1',
          date: new Date(),
          categoryId: 'cat-1',
          userId,
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: null,
        },
        {
          id: 'exp-2',
          amount: '100.00',
          description: 'Expense 2',
          date: new Date(),
          categoryId: 'cat-2',
          userId,
          imageUrl: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: null,
        },
      ];

      mockPrismaService.expense.findMany.mockResolvedValue(mockExpenses);

      const result = await service.findAll(userId);

      expect(mockPrismaService.expense.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: { category: true },
        orderBy: { date: 'desc' },
      });
      expect(result).toEqual(mockExpenses);
      expect(result.length).toBe(2);
    });

    it('should return empty array if user has no expenses', async () => {
      const userId = 'user-123';

      mockPrismaService.expense.findMany.mockResolvedValue([]);

      const result = await service.findAll(userId);

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a specific expense', async () => {
      const expenseId = 'exp-123';
      const userId = 'user-123';
      const mockExpense = {
        id: expenseId,
        amount: '50.00',
        description: 'Test expense',
        date: new Date(),
        categoryId: 'cat-123',
        userId,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: null,
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(mockExpense);

      const result = await service.findOne(expenseId, userId);

      expect(result).toEqual(mockExpense);
    });

    it('should throw NotFoundException if expense does not exist', async () => {
      mockPrismaService.expense.findUnique.mockResolvedValue(null);

      await expect(service.findOne('nonexistent', 'user-123')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user does not own the expense', async () => {
      const mockExpense = {
        id: 'exp-123',
        amount: '50.00',
        description: 'Test expense',
        date: new Date(),
        categoryId: 'cat-123',
        userId: 'other-user',
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: null,
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(mockExpense);

      await expect(service.findOne('exp-123', 'user-123')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('update', () => {
    it('should update an expense', async () => {
      const expenseId = 'exp-123';
      const userId = 'user-123';
      const updateExpenseDto: UpdateExpenseDto = {
        amount: 75.5,
        description: 'Updated expense',
      };

      const mockExpense = {
        id: expenseId,
        amount: '50.00',
        description: 'Original',
        date: new Date(),
        categoryId: 'cat-123',
        userId,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: null,
      };

      const updatedExpense = {
        ...mockExpense,
        amount: '75.50',
        description: 'Updated expense',
        updatedAt: new Date(),
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(mockExpense);
      mockPrismaService.expense.update.mockResolvedValue(updatedExpense);

      const result = await service.update(expenseId, userId, updateExpenseDto);

      expect(mockPrismaService.expense.update).toHaveBeenCalled();
      expect(result.description).toBe('Updated expense');
    });
  });

  describe('remove', () => {
    it('should delete an expense', async () => {
      const expenseId = 'exp-123';
      const userId = 'user-123';

      const mockExpense = {
        id: expenseId,
        amount: '50.00',
        description: 'Test',
        date: new Date(),
        categoryId: 'cat-123',
        userId,
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: null,
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(mockExpense);
      mockPrismaService.expense.delete.mockResolvedValue(mockExpense);

      const result = await service.remove(expenseId, userId);

      expect(mockPrismaService.expense.delete).toHaveBeenCalledWith({
        where: { id: expenseId },
      });
      expect(result).toEqual(mockExpense);
    });

    it('should throw ForbiddenException if user does not own expense', async () => {
      const expenseId = 'exp-123';
      const userId = 'user-123';

      const mockExpense = {
        id: expenseId,
        amount: '50.00',
        description: 'Test',
        date: new Date(),
        categoryId: 'cat-123',
        userId: 'other-user',
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: null,
      };

      mockPrismaService.expense.findUnique.mockResolvedValue(mockExpense);

      await expect(service.remove(expenseId, userId)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
