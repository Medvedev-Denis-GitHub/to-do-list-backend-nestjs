import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { saltRounds } from '../constants';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';
import { UUID } from '../types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<ResponseUserDto> {
    const isExistUser = await this.find({ username: dto.username });
    if (isExistUser) {
      throw new HttpException('Пользователь с таким username же существует', HttpStatus.CONFLICT);
    }

    dto.password = await bcrypt.hash(dto.password, saltRounds);

    return this.usersRepository.save(dto);
  }

  //todo add type Where<...>
  find(where: {
    username?: string;
    id?: UUID;
    companyId?: UUID;
    isOwnerCompany?: boolean;
  }): Promise<User> {
    return this.usersRepository.findOne({ where, relations: ['company'] });
  }
}
