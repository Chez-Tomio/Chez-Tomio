import { ValidationError } from 'class-validator';
import { IncomingMessage, STATUS_CODES } from 'http';
import sanitize from 'mongo-sanitize';
import { LeanDocument } from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import safeCompare from 'safe-compare';

import { connectToDatabase, IUserDocument, User } from '../database/mongo';

export const getUser = async (req: IncomingMessage): Promise<IUserDocument | undefined> => {
    const session = await getSession({ req });
    if (!session || !session.user.email) return undefined;
    const user = await User.findOne({ email: session.user.email });
    return user ?? undefined;
};

export const isUserAdmin = async (req: IncomingMessage): Promise<boolean> => {
    const user = await getUser(req);
    return user?.isAdmin ?? false;
};

export const isRequesterOrderReceiverApp = (req: IncomingMessage): boolean => {
    const correactBearerHeader = `Bearer ${process.env.ORDER_RECEIVER_APP_TOKEN}`;

    return safeCompare(correactBearerHeader, req.headers['authorization'] ?? '');
};

export const sendError = (res: NextApiResponse, errorCode: number, details?: any) =>
    res.status(errorCode).json({
        error: STATUS_CODES[errorCode],
        details,
    });

export const apiEndpointWrapper = (endpoint: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    try {
        sanitize(req.body);
        await connectToDatabase();
        return await endpoint(req, res);
    } catch (error) {
        console.error(error);
        return sendError(res, 500);
    }
};

export const areValidationErrors = (errors: any): errors is ValidationError[] => {
    return errors instanceof Array && errors.every((e) => e instanceof ValidationError);
};
