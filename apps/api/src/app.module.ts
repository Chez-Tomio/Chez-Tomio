// import { EntityManager, MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuItemModule } from './entities/menu-item/menu-item.module';

@Module({
    imports: [
        MikroOrmModule.forRoot({
            type: 'postgresql',
            dbName: 'chez-tomio',
            user: 'postgres',
            password: 'password',
            autoLoadEntities: true,
            validate: true,
            migrations: {
                path: './migrations',
            },
        }),
        MenuItemModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    // constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {
    //     const migrator = orm.getMigrator();
    //     migrator.createMigration().then(() => {
    //         migrator.up().then(() => {
    //             orm.close(true);
    //         });
    //     });
    // }
}
