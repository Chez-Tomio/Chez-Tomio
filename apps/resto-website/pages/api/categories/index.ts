import mongoose from 'mongoose';

import { apiEndpointWrapper, sendError } from '../../../lib/api/utils';
import { Category } from '../../../lib/database/mongo';

export default apiEndpointWrapper(
    async (req, res) => {
        switch (req.method) {
            case 'GET': {
                return res.send(await Category.find());
            }
            case 'POST': {
                try {
                    const product = new Category(req.body);
                    await product.save();
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
    },
    { requiresAdmin: true },
);
