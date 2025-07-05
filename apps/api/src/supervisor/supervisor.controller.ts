import { Controller, Get } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';

@Controller('supervisors')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Get()
  async findAll() {
    return this.supervisorService.findAll();
  }
}