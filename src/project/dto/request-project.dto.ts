import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

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
  description?: string;
}