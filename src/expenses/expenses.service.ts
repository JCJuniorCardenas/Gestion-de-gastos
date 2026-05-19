import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        userId,
      },
      include: { category: true },
    });
  }

  async findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!expense) {
      throw new NotFoundException('Gasto no encontrado');
    }

    if (expense.userId !== userId) {
      throw new ForbiddenException('No tenés acceso a este gasto');
    }

    return expense;
  }

  async update(id: string, userId: string, dto: UpdateExpenseDto) {
    await this.findOne(id, userId);

    return this.prisma.expense.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.date && { date: new Date(dto.date) }),
      },
      include: { category: true },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.expense.delete({
      where: { id },
    });
  }
}