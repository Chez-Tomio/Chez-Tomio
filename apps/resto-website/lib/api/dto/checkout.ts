import 'reflect-metadata';

import { Expose, Type } from 'class-transformer';
import {
    ArrayUnique,
    IsArray,
    IsInt,
    IsMongoId,
    IsPhoneNumber,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

export class ExtraDTO {
    @Expose()
    @IsMongoId()
    id: string;

    @Expose()
    @IsInt()
    @Min(1)
    @Max(3)
    count: number;
}

export class ProductDTO {
    @Expose()
    @IsMongoId()
    id: string;

    @Expose()
    @IsInt()
    @Min(1)
    count: number;

    @Expose()
    @Type(() => ExtraDTO)
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayUnique((o: ExtraDTO) => o.id)
    extras: ExtraDTO[];
}

export class CheckoutDTO {
    @Expose()
    @IsPhoneNumber()
    contactPhoneNumber: string;

    @Expose()
    @Type(() => ProductDTO)
    @IsArray()
    @ValidateNested({ each: true })
    products: ProductDTO[];
}
