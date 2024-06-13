import { IsString, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
