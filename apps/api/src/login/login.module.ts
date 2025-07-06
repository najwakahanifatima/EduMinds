import { Module } from '@nestjs/common';
import { UserLoginController } from './login.controller';
import { UserLogin } from './login.service';

@Module({
  controllers: [UserLoginController],
  providers: [UserLogin],
})
export class UserModule {}
