import { isMongoId } from 'class-validator';
import endent from 'endent';
import * as textToImage from 'text-to-image';

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

    const order = await Order.findById(orderId).lean();

    if (!order) return sendError(res, 404);

    const text = endent`
    Order #${order._id}
    Contact Phone Number: ${order.contactPhoneNumber}

    ------------

    Products:
        ${order.products
            .map((p) => `\t- ${p.title.fr}\n${p.extras.map((e) => `\t\t- ${e.title.fr}\n`)}`)
            .join('\n')}
    ------------

    ${new Date().toLocaleString()}
    `;

    const base64Image = await textToImage.generate(text, {
        maxWidth: 576,
        fontFamily: 'Arial',
        fontSize: 36,
        lineHeight: 40,
    });

    return res.send(base64Image);
});
