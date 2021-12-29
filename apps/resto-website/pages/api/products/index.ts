import mongoose from 'mongoose';

import { uploadImage } from '../../../lib/api/minio';
import { apiEndpointWrapper, sendError } from '../../../lib/api/utils';
import { Category, Product } from '../../../lib/database/mongo';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default apiEndpointWrapper(
    async (req, res) => {
        switch (req.method) {
            case 'GET': {
                return res.send(await Product.find());
            }
            case 'POST': {
                try {
                    const { categoryId, ...productData } = req.body;

                    const product = new Product(productData);

                    const category = await Category.findByIdAndUpdate(
                        categoryId,
                        {
                            $push: {
                                products: product._id,
                            },
                        },
                        { new: true },
                    );
                    if (!category) return sendError(res, 404);

                    if (product.image) {
                        product.image = await uploadImage(product._id, product.image, 'products');
                    }
                    console.log(product);
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
