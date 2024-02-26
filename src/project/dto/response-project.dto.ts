import { UUID } from '../../types';
import { Company } from '../../entities/company.entity';
import { Task } from '../../entities/task.entity';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ResponseCompanyDto } from '../../company/dto/response-company.dto';

export class ResponseProjectDto {
  @ApiProperty({
    type: 'uuid',
    description: 'Id задачи в БД',
  })
  id: UUID;

  @ApiProperty({
    type: Company, //todo add ResponseCompanyDto
    description: 'Данные компании, которой принадлежит задача',
  })
  @Type(() => Company)
  company: ResponseCompanyDto;

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