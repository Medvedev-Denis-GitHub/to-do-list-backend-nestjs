import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
}
