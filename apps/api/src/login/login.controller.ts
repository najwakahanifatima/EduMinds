import { UserLogin } from './login.service';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserLoginController {
    constructor(private readonly userLogin: UserLogin) {}

    @Get()
    async check() {
        return this.userLogin.testConnection();
    }
}