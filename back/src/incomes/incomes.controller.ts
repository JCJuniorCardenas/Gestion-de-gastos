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
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Incomes')
@ApiBearerAuth()
@Controller('incomes')
@UseGuards(JwtGuard)
export class IncomesController {
  constructor(private incomesService: IncomesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo ingreso' })
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateIncomeDto,
  ) {
    return this.incomesService.create(user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ingresos' })
  findAll(@CurrentUser() user: { userId: string }) {
    return this.incomesService.findAll(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ingreso específico' })
  findOne(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.incomesService.findOne(id, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ingreso' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: UpdateIncomeDto,
  ) {
    return this.incomesService.update(id, user.userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ingreso' })
  remove(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.incomesService.remove(id, user.userId);
  }
}
