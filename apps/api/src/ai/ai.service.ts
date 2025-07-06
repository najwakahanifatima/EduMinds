import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '' );
  }

  async ask(message: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const context = `Kamu adalah asisten edukatif untuk para penyandang disabilitas intelektual dalam belajar vokasi.
      Berikan jawaban dengan bahasa sederhana, singkat (1-2 kalimat), dan mudah dimengerti. Ini pertanyaan dari pengguna:\n\n"${message}"`;

    try {
      const result = await model.generateContent(context);
      const response = result.response;
      const text = response.text();

      return text || 'Maaf, saya tidak mengerti.';
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'Terjadi kesalahan saat menghubungi AI.';
    }
  }
}
