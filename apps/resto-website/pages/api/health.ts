import mongoose from 'mongoose';

import { handleServerError } from '../../lib/api/utils';
import { connectToDatabase } from '../../lib/database/mongo';

export default handleServerError(async (req, res) => {
    await connectToDatabase();

    const data = {
        database: {
            readyState: ['disconnected', 'connected', 'connecting', 'disconnecting'][
                mongoose.connection.readyState
            ],
        },
    };

    res.json(data);
});
