import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('sign_up')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
