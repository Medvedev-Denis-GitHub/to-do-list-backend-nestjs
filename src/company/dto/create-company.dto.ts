import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class CreateCompanyDto {
  @Length(1, 50)
  @ApiProperty({
    type: String,
    example: 'Моя первая компания',
    description: 'Название компании',
  })
  title: string;

  @ApiProperty({
    type: String,
    minimum: 5,
    maximum: 25,
    example: 'IsMyCompany',
    description: 'Уникальный тэг компании',
  })
  tag: string;

  @IsOptional()
  @Length(1, 1200)
  @ApiProperty({
    type: String,
    example: 'Самая лучшая компания',
    description: 'Описание компании',
  })
  description?: string;
}
