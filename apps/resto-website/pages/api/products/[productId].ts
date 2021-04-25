import { isMongoId } from 'class-validator';
import mongoose from 'mongoose';

import { apiEndpointWrapper, isUserAdmin, sendError } from '../../../lib/api/utils';
import { Category, Product } from '../../../lib/database/mongo';

export default apiEndpointWrapper(async (req, res) => {
    if (!(await isUserAdmin(req))) return sendError(res, 403);

    const { productId } = req.query as { productId: string };
    if (!isMongoId(productId)) return sendError(res, 400);

    switch (req.method) {
        case 'PATCH': {
            try {
                const product = await Product.findByIdAndUpdate(
                    productId,
                    { $set: req.body },
                    { new: true },
                );

                if (!product) return sendError(res, 404);

                return res.json(product);
            } catch (e) {
                if (
                    e instanceof mongoose.Error.CastError ||
                    e instanceof mongoose.Error.ValidationError
                )
                    return sendError(res, 400);
                throw e;
            }
        }
        case 'DELETE': {
            const product = await Product.findByIdAndDelete(productId);

            if (!product) return sendError(res, 404);

            await Category.updateMany(
                {
                    products: product._id,
                },
                { $pull: { products: product._id } },
            );

            return res.json(product);
        }
        default: {
            return sendError(res, 405);
        }
    }
});
