import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    maximum: 50,
    description: 'Название проекта',
  })
  title?: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Описание проекта',
  })
  description?: string;
}
