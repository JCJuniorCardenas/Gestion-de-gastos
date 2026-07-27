import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
@UseGuards(JwtGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  findAll(@CurrentUser() user: { userId: string }) {
    return this.categoriesService.findAll(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría específica' })
  findOne(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.categoriesService.findOne(id, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, user.userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  remove(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.categoriesService.remove(id, user.userId);
  }
}
