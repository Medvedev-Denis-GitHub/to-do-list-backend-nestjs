import { UUID } from '../../types';
import { IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { Type } from 'class-transformer';
import { CreateCompanyDto } from './create-company.dto';
import { ResponseProjectDto } from '../../project/dto/response-project.dto';

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
  owner: ResponseUserDto;

  @IsArray()
  @Type(() => ResponseUserDto)
  @ApiProperty({
    type: ResponseUserDto,
    isArray: true,
    description: 'Участники компании',
  })
  users: ResponseUserDto[];

  @ApiProperty({
    type: ResponseProjectDto,
    isArray: true,
    description: 'Проекты компании',
  })
  projects: ResponseProjectDto[];
}
