import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('chat')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async chat(@Body('message') message: string) {
    if (!message) return { error: 'Message is required' };

    const reply = await this.aiService.ask(message);
    return { reply };
  }
}
