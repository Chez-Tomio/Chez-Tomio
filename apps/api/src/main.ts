import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'v1';
    app.setGlobalPrefix(globalPrefix);
    const port = 4000;
    await app.listen(port, () => {
        Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();
