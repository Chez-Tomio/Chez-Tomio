import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Controller, Get } from '@nestjs/common';

import { MenuItem } from './menu-item.entity';

@Controller('menu-item')
export class MenuItemController {
    constructor(
        @InjectRepository(MenuItem) private readonly menuItemRepository: EntityRepository<MenuItem>,
    ) {}

    @Get()
    public getMenuItems() {
        this.menuItemRepository.flush();
        return this.menuItemRepository.findAll();
    }
}
