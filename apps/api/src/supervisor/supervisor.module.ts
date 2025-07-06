import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SupervisorController],
  providers: [SupervisorService],
})
export class SupervisorModule {}
