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
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('expenses')
@UseGuards(JwtGuard)
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo gasto' })
  create(
    @CurrentUser() user: { userId: string },
    @Body() dto: CreateExpenseDto,
  ) {
    return this.expensesService.create(user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los gastos' })
  findAll(@CurrentUser() user: { userId: string }) {
    return this.expensesService.findAll(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un gasto específico' })
  findOne(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.expensesService.findOne(id, user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un gasto' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string },
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id, user.userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un gasto' })
  remove(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.expensesService.remove(id, user.userId);
  }
}
