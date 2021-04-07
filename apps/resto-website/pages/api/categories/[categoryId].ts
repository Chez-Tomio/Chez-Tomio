import { isMongoId } from 'class-validator';
import mongoose from 'mongoose';

import { apiEndpointWrapper, isUserAdmin, sendError } from '../../../lib/api/utils';
import { Category, connectToDatabase } from '../../../lib/database/mongo';

export default apiEndpointWrapper(async (req, res) => {
    if (req.method !== 'PUT') return sendError(res, 405);

    if (!(await isUserAdmin(req))) return sendError(res, 403);

    const { categoryId } = req.query as { categoryId: string };

    if (!isMongoId(categoryId)) return sendError(res, 400);

    try {
        const category = await Category.findByIdAndUpdate(
            categoryId,
            { $set: req.body },
            { new: true },
        );

        if (!category) return sendError(res, 404);

        return res.json(category);
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) return sendError(res, 400);
        throw e;
    }
});
