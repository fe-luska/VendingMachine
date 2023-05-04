import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});

    // Utilizar os pipes de validação
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    // Resolver as dependecias
    useContainer(app.select(AppModule), {fallbackOnErrors: true});

    // Porta a ser escutada
    await app.listen(5000);
}

bootstrap();
