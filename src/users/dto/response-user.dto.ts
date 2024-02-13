import { RolesUserInCompany, UUID } from '../../types';
import { Company } from '../../entities/company.entity';
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: '90f1eaf6-08e5-42ae-b5f1-c66c454617cc',
    description: 'Уникальный UUID пользователя в БД',
  })
  id: UUID;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  @ApiProperty({
    type: String,
    example: 'myUsername',
    description: 'Уникальный Username пользователя',
  })
  username: string;

  @IsOptional()
  @IsString()
  @Length(1, 25)
  @ApiProperty({
    type: String,
    example: 'Денис',
    description: 'Имя пользователя',
  })
  firstname: string;

  @IsOptional()
  @IsString()
  @Length(1, 25)
  @ApiProperty({
    type: String,
    example: 'Медведев',
    description: 'Фамилия пользователя',
  })
  lastname: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    example: '123ABCD',
    description: 'Пароль пользователя',
  })
  password: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'Является ли пользователь владельцем компании',
  })
  isOwnerCompany: boolean;

  company: Company;

  @IsEnum(RolesUserInCompany)
  @IsOptional()
  @ApiProperty({
    enum: RolesUserInCompany,
    example: RolesUserInCompany.MEMBER,
    description: 'Роль пользователя в компании',
  })
  roleInCompany: RolesUserInCompany;
}
