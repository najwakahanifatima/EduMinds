import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { JobService } from './job.service'

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async findAll(
    @Query('title') title?: string,
    @Query('location') location?: string,
  ) {
    return this.jobService.findAll(title, location);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.findOne(id);
  }
}