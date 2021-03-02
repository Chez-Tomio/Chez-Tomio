import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    // getHello(): string {
    //     return 'Hello World!';
    // }
    getData(): { message: string } {
        return { message: 'Welcome to api!' };
    }
}
