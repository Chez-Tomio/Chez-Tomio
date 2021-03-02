import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuItemModule } from './entities/menu-item/menu-item.module';

@Module({
    imports: [
        MikroOrmModule.forRoot({
            type: 'postgresql',
            entities: ['./entities'],
            entitiesTs: ['./entities'],
            dbName: 'chez-tomio',
            user: 'postgres',
            password: 'password',
            autoLoadEntities: true,
            validate: true,
        }),
        MenuItemModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
