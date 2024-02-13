import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDto {
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
  @ApiProperty({
    type: String,
    example: '123ABCD',
    description: 'Пароль пользователя',
  })
  password: string;
}
