import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../lib/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    const data = {
        database: {
            readyState: mongoose.connection.readyState,
        },
    };

    res.json(data);
};
