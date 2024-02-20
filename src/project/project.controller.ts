import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectService } from './project.service';
import { GetUser } from '../users/decarators/user.decarator';
import { User } from '../entities/user.entity';
import { RequestProjectDto } from './dto/request-project.dto';

@ApiTags('Project')
@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @ApiBody({ type: () => RequestProjectDto })
  @ApiOperation({ summary: 'Создание проекта в компании' })
  @ApiResponse({ status: HttpStatus.CREATED }) //todo add response dto
  create(@GetUser() user: User, @Body() body: RequestProjectDto) {
    return this.projectService.createCompany(body, user);
  }
}
