import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';

@Controller('supervisors')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Get()
  async findAll() {
    return this.supervisorService.findAll();
  }

  @Post('assign')
  async assignSupervisor(
    @Body() body: { userId: number; supervisorId: number },
  ) {
    const { userId, supervisorId } = body;

    if (!userId || !supervisorId) {
      return { error: 'userId dan supervisorId wajib diisi' };
    }

    await this.supervisorService.assignSupervisor(userId, supervisorId);
    return { success: true };
  }
}