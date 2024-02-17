import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class UpdateCompanyDto {
  @Length(1, 50)
  @ApiProperty({
    type: String,
    example: 'Моя первая компания!',
    description: 'Название компании',
  })
  title?: string;

  @ApiProperty({
    type: String,
    minimum: 5,
    maximum: 25,
    example: 'IsMyCompany2',
    description: 'Уникальный тэг компании',
  })
  tag?: string;

  @IsOptional()
  @Length(1, 1200)
  @ApiProperty({
    type: String,
    example: 'Наверное самая лучшая компания',
    description: 'Описание компании',
  })
  description?: string;
}