import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  private readonly defaultCategories = [
    'Alimentación',
    'Transporte',
    'Salud',
    'Entretenimiento',
    'Hogar',
    'Educación',
    'Ropa',
    'Otros',
  ];

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string, userId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('No tenés acceso a esta categoría');
    }

    return category;
  }

  async update(id: string, userId: string, dto: UpdateCategoryDto) {
    await this.findOne(id, userId); // verifica existencia y permisos

    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // verifica existencia y permisos

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
