import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SignInRequestDto } from './dto/auth-request.dto';
import { GetUser } from '../users/decarators/user.decarator';

@ApiTags('Auth users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInRequestDto })
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
  login(@GetUser() user: User): Promise<AuthResponseDto> {
    return this.authService.login(user);
  }
}
