import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { CareerModule } from './career/career.module'
import { SupervisorModule } from './supervisor/supervisor.module'

@Module({
  imports: [UserModule, AuthModule, HttpModule, CareerModule, SupervisorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
