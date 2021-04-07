import { isMongoId } from 'class-validator';
import mongoose from 'mongoose';

import { handleServerError, isUserAdmin, sendError } from '../../../lib/api/utils';
import { connectToDatabase, Product } from '../../../lib/database/mongo';

export default handleServerError(async (req, res) => {
    await connectToDatabase();

    if (req.method !== 'PUT') return sendError(res, 405);
    if (!(await isUserAdmin(req))) return sendError(res, 403);

    const { productId } = req.query as { productId: string };

    if (!isMongoId(productId)) return sendError(res, 400);

    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            { $set: req.body },
            { new: true },
        );

        if (!product) return sendError(res, 404);

        return res.status(200).json(product);
    } catch (e) {
        if (e instanceof mongoose.Error.CastError || e instanceof mongoose.Error.ValidationError)
            return sendError(res, 400);
        throw e;
    }
});
