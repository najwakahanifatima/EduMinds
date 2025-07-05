import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(
        @Body() body: { email: string; password: string; role: 'user' | 'supervisor' },
    ) {
        const user = await this.authService.validateUser(body.email, body.password, body.role);
        return this.authService.login(user, body.role);
    }

    @Post('register')
    async register(@Body() body: { name: string; email: string; password: string, birthdate: string }) {
        return this.authService.register(body);
    }

    
}