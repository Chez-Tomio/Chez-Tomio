import { Entity, JsonType, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class MenuItem {
    @PrimaryKey()
    id!: number;

    @Property({ type: JsonType, nullable: true })
    title!: {
        fr: string;
        en: string;
    };

    @Property({ type: JsonType, nullable: true })
    description!: {
        fr: string;
        en: string;
    };

    @Property()
    isSpeciality: boolean;
}
