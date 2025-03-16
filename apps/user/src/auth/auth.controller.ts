import { Body, Controller, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { Authorization } from './decorator/authorization.decorator';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ParseBearerTokenDto } from './dto/parse-bearer-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UsePipes(ValidationPipe)
  registerUser(@Authorization() token: string, @Body() registerDto: RegisterDto) {
    if (token === null) {
      throw new UnauthorizedException('トークンを入力してください');
    }
    return this.authService.register(token, registerDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  loginUser(@Authorization() token: string) {
    if (token === null) {
      throw new UnauthorizedException("トークンが必要です。")
    }
    return this.authService.login(token);
  }

  @MessagePattern({
    cmd: 'parse_bearer_token'
  })
  @UsePipes(ValidationPipe)
  parseBearerToken(@Payload() payload: ParseBearerTokenDto) {
    console.log("rrr")
    return this.authService.parseBearerToken(payload.token, false);
  }

}
