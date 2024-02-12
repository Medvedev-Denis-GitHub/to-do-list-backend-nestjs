import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Неверный логин или пароль');
    }

    return user;
  }

  async login(user: User) {
    const payload = {
      sub: {
        userId: user.id,
      },
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
