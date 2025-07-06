import { Controller, Post, Body } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post('recommend')
  async recommendCareer(@Body() body: {
    Tanaman: number;
    Interaksi: number;
    Masak: number;
    Kebersihan: number;
    Uang: number;
    Tenang: number;
  }) {
    console.log('DEBUG in nest for career recommendation api: ', body.Tanaman, body.Interaksi, body.Masak, body.Kebersihan, body.Uang, body.Tenang);
    const result = await this.careerService.predict(body);
    return { career: result , image: "/"+result+".png"};
  }
}
