import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@users/entities/user.entity';
import { SignUpDTO } from '@auth/dtos/signup.dto';
import { AuthService } from '@auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDTO): Promise<User> {
    return this.authService.signUp(signUpDto);
  }
}
