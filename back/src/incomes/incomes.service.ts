import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateIncomeDto) {
    // Validar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.prisma.income.create({
      data: {
        amount: dto.amount,
        description: dto.description,
        date: new Date(dto.date + 'T12:00:00Z'),
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.income.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const income = await this.prisma.income.findUnique({ where: { id } });
    if (!income) throw new NotFoundException('Ingreso no encontrado');
    if (income.userId !== userId)
      throw new ForbiddenException('No tenés acceso a este ingreso');
    return income;
  }

  async update(id: string, userId: string, dto: UpdateIncomeDto) {
    await this.findOne(id, userId);
    return this.prisma.income.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.date && { date: new Date(dto.date + 'T12:00:00Z') }),
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.income.delete({ where: { id } });
  }
}
