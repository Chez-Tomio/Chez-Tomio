import 'reflect-metadata';

import { Expose, Type } from 'class-transformer';
import {
    ArrayMinSize,
    ArrayUnique,
    IsArray,
    IsInt,
    IsMongoId,
    IsPhoneNumber,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

import { ISerializedProduct } from '../../database/mongo';

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
    @ArrayMinSize(1)
    products: ProductDTO[];
}

export type ProductDTOWithMetadata = {
    extras: (ISerializedProduct['extras'][number] & { count: number })[];
} & ISerializedProduct & {
        count: number;
    };
