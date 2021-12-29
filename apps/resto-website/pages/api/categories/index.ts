import mongoose from 'mongoose';

import { uploadImage } from '../../../lib/api/minio';
import { apiEndpointWrapper, sendError } from '../../../lib/api/utils';
import { Category } from '../../../lib/database/mongo';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default apiEndpointWrapper(
    async (req, res) => {
        switch (req.method) {
            case 'GET': {
                return res.send(await Category.find());
            }
            case 'POST': {
                try {
                    const category = new Category(req.body);
                    category.image = await uploadImage(category._id, category.image, 'categories');
                    await category.save();
                    return res.send(category);
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
