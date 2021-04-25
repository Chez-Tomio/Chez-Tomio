import { isMongoId } from 'class-validator';

import {
    apiEndpointWrapper,
    isRequesterOrderReceiverApp,
    sendError,
} from '../../../../../lib/api/utils';
import { Order } from '../../../../../lib/database/mongo';

export default apiEndpointWrapper(async (req, res) => {
    if (!isRequesterOrderReceiverApp(req)) return sendError(res, 403);

    if (req.method !== 'GET') return sendError(res, 405);

    const { orderId } = req.query as { orderId: string };
    if (!isMongoId(orderId)) return sendError(res, 400);

    const order = await Order.findByIdAndUpdate(orderId, { completed: true }, { new: true });

    if (!order) return sendError(res, 404);

    return res.send(order.completed);
});
