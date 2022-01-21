import 'reflect-metadata';

import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsInt, Min, validateOrReject } from 'class-validator';

import { apiEndpointWrapper, areValidationErrors, sendError } from '../../../lib/api/utils';
import { Order } from '../../../lib/database/mongo';

class PaginateQueryDTO {
    @Expose()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @IsInt()
    @Min(1)
    perPage: number;

    @Expose()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @IsInt()
    @Min(0)
    pageNumber: number;
}

export default apiEndpointWrapper(
    async (req, res) => {
        if (req.method !== 'GET') return sendError(res, 405);

        const paginateQueryDTO = plainToInstance(PaginateQueryDTO, req.query, {
            excludeExtraneousValues: true,
        });

        try {
            await validateOrReject(paginateQueryDTO);
        } catch (e) {
            if (areValidationErrors(e)) return sendError(res, 400);
            else throw e;
        }

        const { perPage, pageNumber } = paginateQueryDTO;

        const totalNumberOfPages = Math.ceil((await Order.count()) / perPage);

        const orders = await Order.find(
            {},
            {},
            { sort: { createdAt: 'desc' }, skip: perPage * pageNumber, limit: perPage },
        );

        return res.send({ totalNumberOfPages, orders });
    },
    { requiresAdmin: true },
);
