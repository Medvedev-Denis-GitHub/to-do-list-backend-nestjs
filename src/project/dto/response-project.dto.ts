import { UUID } from '../../types';
import { Task } from '../../entities/task.entity';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseProjectDto {
  @ApiProperty({
    type: 'uuid',
    example: 'ebda8a93-5e0c-4208-b7ff-a4010800894b',
    description: 'Id задачи в БД',
  })
  id: UUID;

  @ApiProperty({
    type: 'uuid',
    example: 'ebda8a93-5e0c-4208-b7ff-a4010800894b',
    description: 'Id компании',
  })
  companyId: UUID;

  @ApiProperty({
    type: String,
    minimum: 1,
    maximum: 50,
    description: 'Название проекта',
  })
  title: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Описание проекта',
  })
  description?: string;

  @ApiProperty({
    type: Task, //todo add response task dto
    isArray: true,
    description: 'Задачи проекта',
  })
  tasks: Task[]; //todo add response task dto
}
