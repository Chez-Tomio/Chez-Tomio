import { NextApiRequest, NextApiResponse } from 'next';

import { apiEvents } from '../../../lib/api/events';
import { isRequesterOrderReceiverApp, sendError } from '../../../lib/api/utils';
import { connectToDatabase, Order } from '../../../lib/database/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isRequesterOrderReceiverApp(req)) return sendError(res, 403);

    await connectToDatabase();

    const { limit } = req.query;

    if (typeof limit !== 'string') return sendError(res, 400);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Content-Encoding', 'none');

    for (const order of (
        await Order.find(
            {
                paymentStatus: 'payed',
            },
            {},
            { sort: { createdAt: 'desc' }, limit: parseInt(limit) },
        )
    ).reverse())
        res.write(`data: ${order.id}\n\n`);

    apiEvents.on('newOrder', (orderId) => {
        res.write(`data: ${orderId}\n\n`);
    });
};
