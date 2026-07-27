import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateExpenseDto) {
    // Validar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const data: any = {
      amount: dto.amount,
      description: dto.description,
      date: new Date(dto.date + 'T12:00:00Z'),
      userId,
    };

    if (dto.imageUrl) {
      data.imageUrl = dto.imageUrl;
    }

    if (dto.categoryId) {
      data.categoryId = dto.categoryId;
    }

    return this.prisma.expense.create({
      data,
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

    const data: any = {};

    if (dto.amount !== undefined) data.amount = dto.amount;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.date !== undefined) data.date = new Date(dto.date + 'T12:00:00Z');
    if (dto.imageUrl !== undefined) data.imageUrl = dto.imageUrl;
    if (dto.categoryId !== undefined) data.categoryId = dto.categoryId;

    return this.prisma.expense.update({
      where: { id },
      data,
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
