import { Module } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { AuthController } from '@auth/controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
