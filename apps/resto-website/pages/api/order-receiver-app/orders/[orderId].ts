import { isMongoId } from 'class-validator';

import {
    apiEndpointWrapper,
    isRequesterOrderReceiverApp,
    sendError,
} from '../../../../lib/api/utils';
import { Order } from '../../../../lib/database/mongo';

export default apiEndpointWrapper(async (req, res) => {
    if (!isRequesterOrderReceiverApp(req)) return sendError(res, 403);

    if (req.method !== 'GET') return sendError(res, 405);

    const { orderId } = req.query as { orderId: string };
    if (!isMongoId(orderId)) return sendError(res, 400);

    const order = await Order.findById(orderId).lean();

    if (!order) return sendError(res, 404);

    const orderData = {
        id: order._id,
        time: order.createdAt,
        contactPhoneNumber: order.contactPhoneNumber,
        completed: order.completed,
        products: order.products.map((p) => ({
            id: p._id,
            title: p.title.fr,
            extras: p.extras.map((e) => ({ id: e._id, title: e.title.fr })),
        })),
    };

    return res.send(orderData);
});
