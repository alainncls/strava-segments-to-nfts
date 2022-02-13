import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const appOptions = {cors: true};
    process.env.NODE_DEBUG='request'
    const app = await NestFactory.create(AppModule, appOptions);
    await app.listen(3000);
}

bootstrap()
    .catch((err) => {
        console.log(err);
    });
