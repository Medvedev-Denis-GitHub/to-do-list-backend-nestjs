import { RolesUserInCompany, UUID } from '../../types';
import { Company } from '../../entities/company.entity';
import { IsBoolean, IsEnum, IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @IsUUID()
  @ApiProperty({
    example: '90f1eaf6-08e5-42ae-b5f1-c66c454617cc',
    description: 'Уникальный UUID пользователя в БД',
  })
  id: UUID;

  @IsString()
  @Length(1, 20)
  @ApiProperty({
    type: String,
    example: 'myUsername',
    description: 'Уникальный Username пользователя',
  })
  username: string;

  @IsString()
  @Length(1, 25)
  @ApiProperty({
    type: String,
    example: 'Денис',
    description: 'Имя пользователя',
  })
  firstname: string;

  @IsString()
  @Length(1, 25)
  @ApiProperty({
    type: String,
    example: 'Медведев',
    description: 'Фамилия пользователя',
  })
  lastname: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: '123ABCD',
    description: 'Пароль пользователя',
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Является ли пользователь владельцем компании',
  })
  isOwnerCompany: boolean;

  company: Company; //todo swagger

  @IsEnum(RolesUserInCompany)
  @ApiProperty({
    enum: RolesUserInCompany,
    example: RolesUserInCompany.MEMBER,
    description: 'Роль пользователя в компании',
  })
  roleInCompany: RolesUserInCompany;
}
