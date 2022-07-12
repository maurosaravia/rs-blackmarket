import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@users/entities/user.entity';
import { SignUpDTO } from '@auth/dtos/signup.dto';
import { AuthService } from '@auth/services/auth.service';
import { SignInDTO } from '@auth/dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDTO): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  async signin(@Body() signInDto: SignInDTO): Promise<{ accessToken }> {
    return this.authService.signIn(signInDto);
  }
}
