import mongoose from 'mongoose';

import { apiEndpointWrapper, sendError } from '../../lib/api/utils';

export default apiEndpointWrapper(async (req, res) => {
    if (req.method !== 'GET') return sendError(res, 405);

    const data = {
        database: {
            readyState: ['disconnected', 'connected', 'connecting', 'disconnecting'][
                mongoose.connection.readyState
            ],
        },
    };

    res.json(data);
});
