import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class RequestProjectDto {
  @ApiProperty({
    type: String,
    example: 'Телеграм бот такси',
    description: 'Название проекта',
  })
  title: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    maximum: 1200,
    description: 'Описание проекта',
  })
  @Length(0, 1200)
  description?: string;
}