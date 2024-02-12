import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { saltRounds } from '../constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const isExistUser = await this.findByUsername(dto.username);
    if (isExistUser) {
      throw new HttpException('Пользователь с таким username же существует', HttpStatus.CONFLICT);
    }

    dto.password = await bcrypt.hash(dto.password, saltRounds);

    return this.usersRepository.save(dto);
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }
}
