import { IsNumber, IsString, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIncomeDto {
  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  amount!: number;

  @IsString()
  description!: string;

  @IsDateString()
  date!: string;
}
