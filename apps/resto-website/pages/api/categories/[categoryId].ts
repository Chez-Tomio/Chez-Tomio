import { isMongoId } from 'class-validator';
import mongoose from 'mongoose';
import slug from 'slug';

import { apiEndpointWrapper, isUserAdmin, sendError } from '../../../lib/api/utils';
import { Category, Product } from '../../../lib/database/mongo';

export default apiEndpointWrapper(async (req, res) => {
    if (!(await isUserAdmin(req))) return sendError(res, 403);

    const { categoryId } = req.query as { categoryId: string };
    if (!isMongoId(categoryId)) return sendError(res, 400);

    switch (req.method) {
        case 'PATCH': {
            try {
                const category = await Category.findByIdAndUpdate(
                    categoryId,
                    { $set: { ...req.body, slug: slug(req.body.title.fr) } },
                    { new: true },
                );

                if (!category) return sendError(res, 404);

                return res.json(category);
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
            const category = await Category.findByIdAndDelete(categoryId);

            if (!category) return sendError(res, 404);

            for (const productId of category.products) await Product.findByIdAndDelete(productId);

            return res.json(category);
        }
        default: {
            return sendError(res, 405);
        }
    }
});
