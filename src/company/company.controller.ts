import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../users/decarators/user.decarator';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from '../entities/company.entity';
import { IsNotHaveCompanyGuard } from './guards/is-not-have-company.guard';
import { IsOwnerCompanyGuard } from './guards/is-owner-company';
import { UUID } from '../types';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('The company')
@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  @UseGuards(IsNotHaveCompanyGuard)
  @ApiBody({ type: () => CreateCompanyDto })
  @ApiOperation({ summary: 'Создание компании' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Company })
  create(@GetUser() user: User, @Body() body: CreateCompanyDto): Promise<Company> {
    return this.companyService.createCompany(body, user);
  }

  @Get(':id')
  @UseGuards(IsOwnerCompanyGuard)
  @ApiOperation({ summary: 'Получение компании' })
  @ApiResponse({ status: HttpStatus.OK, type: Company })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id компании, которую хотим получить',
  })
  getById(@Param('id', new ParseUUIDPipe()) uuid: UUID): Promise<Company> {
    return this.companyService.getCompanyById(uuid);
  }

  @Patch(':id')
  @UseGuards(IsOwnerCompanyGuard)
  @ApiOperation({ summary: 'Обновление данных компании' })
  @ApiResponse({ status: HttpStatus.OK, type: Company })
  @ApiBody({ type: () => UpdateCompanyDto })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id компании, данные которой хотим обновить',
  })
  updateById(
    @Body() body: UpdateCompanyDto,
    @Param('id', new ParseUUIDPipe()) uuid: UUID,
  ): Promise<Company> {
    return this.companyService.updateCompanyById(uuid, body);
  }
}
