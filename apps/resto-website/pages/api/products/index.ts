import _ from 'lodash';
import mongoose from 'mongoose';

import { apiEndpointWrapper, isUserAdmin, sendError } from '../../../lib/api/utils';
import { Product } from '../../../lib/database/mongo';

export default apiEndpointWrapper(async (req, res) => {
    if (!(await isUserAdmin(req))) return sendError(res, 403);

    switch (req.method) {
        case 'GET': {
            return res.send(await Product.find());
        }
        case 'POST': {
            try {
                const product = new Product(req.body);
                console.log(await product.save());
                return res.send(product);
            } catch (e) {
                if (
                    e instanceof mongoose.Error.CastError ||
                    e instanceof mongoose.Error.ValidationError
                )
                    return sendError(res, 400);
                throw e;
            }
        }
        default: {
            return sendError(res, 405);
        }
    }
});
