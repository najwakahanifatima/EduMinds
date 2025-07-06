import { Module } from '@nestjs/common';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CareerController],
  providers: [CareerService],
})
export class CareerModule {}
