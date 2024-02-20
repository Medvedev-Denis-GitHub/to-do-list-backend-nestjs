import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class UpdateCompanyDto {
  @Length(1, 50)
  @ApiProperty({
    type: String,
    required: false,
    example: 'Моя первая компания!',
    description: 'Название компании',
  })
  title?: string;

  @ApiProperty({
    type: String,
    required: false,
    minimum: 5,
    maximum: 25,
    example: 'IsMyCompany2',
    description: 'Уникальный тэг компании',
  })
  tag?: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    maximum: 1200,
    required: false,
    example: 'Наверное самая лучшая компания',
    description: 'Описание компании',
  })
  description?: string;
}