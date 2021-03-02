import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { MenuItemController } from './menu-item.controller';
import { MenuItem } from './menu-item.entity';

@Module({
    imports: [MikroOrmModule.forFeature([MenuItem])],
    controllers: [MenuItemController],
})
export class MenuItemModule {}
