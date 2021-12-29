import { isMongoId } from 'class-validator';
import mongoose from 'mongoose';
import slug from 'slug';

import { deleteFile, uploadImage } from '../../../lib/api/minio';
import { apiEndpointWrapper, sendError } from '../../../lib/api/utils';
import { Category, Product } from '../../../lib/database/mongo';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default apiEndpointWrapper(
    async (req, res) => {
        const { productId } = req.query as { productId: string };
        if (!isMongoId(productId)) return sendError(res, 400);

        switch (req.method) {
            case 'PATCH': {
                try {
                    if (req.body.image) {
                        req.body.image = await uploadImage(
                            req.body._id,
                            req.body.image,
                            'products',
                        );
                    }

                    const product = await Product.findByIdAndUpdate(
                        productId,
                        { $set: req.body, slug: slug(req.body.title.fr) },
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

                if (product.image) {
                    deleteFile(product.image);
                }

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
    },
    { requiresAdmin: true },
);
