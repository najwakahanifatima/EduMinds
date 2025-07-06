import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CareerService {
  constructor(private httpService: HttpService) {}

  async predict(preference: {
    Tanaman: number;
    Interaksi: number;
    Masak: number;
    Kebersihan: number;
    Uang: number;
    Tenang: number;
  }): Promise<string> {
    const response = await lastValueFrom(
      this.httpService.post('http://localhost:5000/predict', preference)
    );
    return response.data.career;
  }
}