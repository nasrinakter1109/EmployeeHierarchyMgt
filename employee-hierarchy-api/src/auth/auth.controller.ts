import { Controller, Post,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 201, description: 'JWT token successfully generated.' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ type: LoginDto }) 
  @Post('login')
  async login(@Request() req) {    
    return this.authService.login(req.body);
  }
}
