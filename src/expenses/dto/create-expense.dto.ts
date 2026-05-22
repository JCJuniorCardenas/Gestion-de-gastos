import { IsString, IsNumber, IsDateString, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  amount!: number;

  @IsString()
  description!: string;

  @IsDateString()
  date!: string;

  @IsString()
  categoryId!: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}