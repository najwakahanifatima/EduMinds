import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // allow frontend origin
    credentials: true, // if using cookies or auth headers
  })

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
