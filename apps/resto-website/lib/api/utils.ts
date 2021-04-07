import { ValidationError } from 'class-validator';
import { STATUS_CODES } from 'http';
import { LeanDocument } from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import { IUserDocument, User } from '../database/mongo';

export const getUser = async (
    req: NextApiRequest,
): Promise<LeanDocument<IUserDocument> | undefined> => {
    const session = await getSession({ req });
    if (!session || !session.user.email) return undefined;
    const user = await User.findOne({ email: session.user.email });
    return user?.toObject() ?? undefined;
};

export const isUserAdmin = async (req: NextApiRequest): Promise<boolean> => {
    const user = await getUser(req);
    return user?.isAdmin ?? false;
};

export const sendError = (res: NextApiResponse, errorCode: number, details?: any) =>
    res.status(errorCode).json({
        error: STATUS_CODES[errorCode],
        details,
    });

export const handleServerError = (endpoint: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    try {
        return await endpoint(req, res);
    } catch (error) {
        console.error(error);
        return sendError(res, 500);
    }
};

export const areValidationErrors = (errors: any): errors is ValidationError[] => {
    return errors instanceof Array && errors.every((e) => e instanceof ValidationError);
};
