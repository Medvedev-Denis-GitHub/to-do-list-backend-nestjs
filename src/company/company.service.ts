import { BadRequestException, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../entities/user.entity';
import { RolesUserInCompany, UUID } from '../types';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createCompany(dto: CreateCompanyDto, owner: User): Promise<Company> {
    await this.isValidCompany(dto);

    const company = await this.companyRepository.save({
      ...dto,
      owner,
      ownerId: owner.id,
    });

    await this.usersRepository.update(owner.id, {
      roleInCompany: RolesUserInCompany.OWNER,
      isOwnerCompany: true,
      companyId: company.id,
      company,
    });

    return company;
  }

  getCompanyById(id: UUID): Promise<Company> {
    return this.companyRepository.findOne({
      where: { id },
      relations: ['owner', 'users', 'projects'],
    });
  }

  async updateCompanyById(id: UUID, dto: UpdateCompanyDto): Promise<Company> {
    const instance = await this.companyRepository.findOneBy({ id });
    if (!instance) {
      throw new BadRequestException('Компания не найдена');
    }

    return this.companyRepository.save({
      ...instance,
      ...dto,
    });
  }

  private async isValidCompany(dto: CreateCompanyDto) {
    const { tag } = dto;

    if (!this.isValidLengthTag(tag)) {
      throw new BadRequestException(
        'Тэг вашей компании должен быть не менее 5 символов и не больее 25',
      );
    }

    const findByTag = await this.companyRepository.existsBy({ tag });
    if (findByTag) {
      throw new BadRequestException('Тэг занят. Придумайте новый');
    }
  }

  private isValidLengthTag(tag: string) {
    return tag.length >= 5 && tag.length <= 25;
  }
}
