import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../lib/database/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    const data = {
        database: {
            readyState: ['disconnected', 'connected', 'connecting', 'disconnecting'][
                mongoose.connection.readyState
            ],
        },
    };

    res.json(data);
};
