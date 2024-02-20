import { Relation } from 'typeorm';
import { UUID } from '../../types';
import { IsArray, IsUUID } from 'class-validator';
import { Project } from '../../entities/project.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { Type } from 'class-transformer';
import { CreateCompanyDto } from './create-company.dto';

export class ResponseCompanyDto extends CreateCompanyDto {
  @IsUUID()
  @ApiProperty({
    type: 'uuid',
    description: 'Уникальный id компании в БД',
  })
  id: UUID;

  @IsUUID()
  @ApiProperty({
    type: 'uuid',
    description: 'Id владельца компании',
  })
  ownerId: UUID;

  @ApiProperty({
    type: ResponseUserDto,
    description: 'Данные владельца компании',
  })
  @Type(() => ResponseUserDto)
  owner: Relation<ResponseUserDto>;

  @IsArray()
  @Type(() => ResponseUserDto)
  @ApiProperty({
    type: ResponseUserDto,
    isArray: true,
    description: 'Участники компании',
  })
  users: Relation<ResponseUserDto>[];

  //todo add project dto
  projects: Relation<Project>[];
}