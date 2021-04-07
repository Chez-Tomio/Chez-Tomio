import mongoose from 'mongoose';

import { handleServerError, isUserAdmin, sendError } from '../../../lib/api/utils';
import { Category, connectToDatabase } from '../../../lib/database/mongo';

export default handleServerError(async (req, res) => {
    await connectToDatabase();

    if (!(await isUserAdmin(req))) return sendError(res, 403);

    switch (req.method) {
        case 'GET': {
            return res.status(200).send(await Category.find().lean());
        }
        case 'POST': {
            try {
                const product = new Category(req.body);
                await product.save();
                return res.status(200).send(product);
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
