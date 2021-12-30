import { isMongoId } from 'class-validator';
import mongoose from 'mongoose';
import slug from 'slug';

import { deleteFile, uploadImage } from '../../../lib/api/minio';
import { apiEndpointWrapper, sendError } from '../../../lib/api/utils';
import { Category, Product } from '../../../lib/database/mongo';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default apiEndpointWrapper(
    async (req, res) => {
        const { categoryId } = req.query as { categoryId: string };
        if (!isMongoId(categoryId)) return sendError(res, 400);

        switch (req.method) {
            case 'PATCH': {
                try {
                    if (req.body.image) {
                        req.body.image = await uploadImage(
                            req.body._id,
                            req.body.image,
                            'categories',
                        );
                    }

                    const category = await Category.findByIdAndUpdate(
                        categoryId,
                        { $set: { ...req.body, slug: slug(req.body.title.fr) } },
                        { new: true },
                    );
                    if (!category) return sendError(res, 404);

                    category.image = await uploadImage(category._id, category.image, 'categories');
                    return res.json(category);
                } catch (e) {
                    console.log(e);
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

                deleteFile(category.image);

                for (const productId of category.products)
                    await Product.findByIdAndDelete(productId);

                return res.json(category);
            }
            default: {
                return sendError(res, 405);
            }
        }
    },
    { requiresAdmin: true },
);
