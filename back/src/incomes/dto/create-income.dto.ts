import { IsNumber, IsString, IsDateString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIncomeDto {
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
}
