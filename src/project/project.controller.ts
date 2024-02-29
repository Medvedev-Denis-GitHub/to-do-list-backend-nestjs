import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectService } from './project.service';
import { GetUser } from '../users/decarators/user.decarator';
import { User } from '../entities/user.entity';
import { RequestProjectDto } from './dto/request-project.dto';
import { HasCompanyGuard } from '../company/guards/has-company.guard';
import { ResponseProjectDto } from './dto/response-project.dto';
import { IsOwnerProjectGuard } from './guards/is-owner-project';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UUID } from '../types';

@ApiTags('Project')
@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @UseGuards(HasCompanyGuard)
  @ApiBody({ type: () => RequestProjectDto })
  @ApiOperation({ summary: 'Создание проекта в компании' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseProjectDto })
  create(@GetUser() user: User, @Body() body: RequestProjectDto): Promise<ResponseProjectDto> {
    return this.projectService.createProject(body, user);
  }

  @Patch(':id')
  @UseGuards(IsOwnerProjectGuard)
  @ApiOperation({ summary: 'Обновление данных проекта' })
  @ApiResponse({ status: HttpStatus.OK, type: ResponseProjectDto })
  @ApiBody({ type: () => UpdateProjectDto })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id проекта, данные которого хотим обновить',
  })
  update(@Body() body: UpdateProjectDto, @Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.projectService.updateProject(id, body);
  }

  @Delete(':id')
  @UseGuards(IsOwnerProjectGuard)
  @ApiOperation({
    summary: 'Каскадное удаление проекта',
    description: 'Проект будет удалён вместе со всеми задачами этого проекта',
  })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'Id проекта, который хотим удалить',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.projectService.deleteProject(id);
  }
}
