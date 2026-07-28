import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
  @IsNumber()
  @Min(0.01)
  @Max(9999999999.99, {
    message: 'El monto no puede superar $9,999,999,999.99',
  })
  @Type(() => Number)
  amount!: number;

  @IsString()
  description!: string;

  @IsDateString()
  date!: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
