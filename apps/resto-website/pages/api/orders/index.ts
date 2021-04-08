import { Expose, plainToClass, Transform } from 'class-transformer';
import { IsInt, Min, validateOrReject } from 'class-validator';

import {
    apiEndpointWrapper,
    areValidationErrors,
    isUserAdmin,
    sendError,
} from '../../../lib/api/utils';
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

export default apiEndpointWrapper(async (req, res) => {
    if (!(await isUserAdmin(req))) return sendError(res, 403);

    if (req.method !== 'GET') return sendError(res, 405);

    const paginateQueryDTO = plainToClass(PaginateQueryDTO, req.query, {
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
    const orders = await Order.find({}, {}, { skip: perPage * pageNumber, limit: pageNumber });

    return res.send({ totalNumberOfPages, orders });
});
