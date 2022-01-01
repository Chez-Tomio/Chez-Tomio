import { ValidationError } from 'class-validator';
import { IncomingMessage, STATUS_CODES } from 'http';
import sanitize from 'mongo-sanitize';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { getSession } from 'next-auth/client';
import safeCompare from 'safe-compare';

import { connectToDatabase } from '../database/mongo';

const { globalConfig } = getConfig().publicRuntimeConfig;

/**
 * Api endpoint wrapper
 */
export const apiEndpointWrapper = (
    endpoint: NextApiHandler,
    {
        requiresStoreToBeEnabled = false,
        requiresAdmin = false,
    }: Partial<{ requiresStoreToBeEnabled: boolean; requiresAdmin: boolean }> = {},
): NextApiHandler => async (req, res) => {
    if (
        (requiresStoreToBeEnabled && !globalConfig.isStoreEnabled) ||
        (requiresAdmin && !(await isAdmin(req)))
    )
        return sendError(res, 403);

    try {
        sanitize(req.body);
        await connectToDatabase();
        return await endpoint(req, res);
    } catch (error) {
        console.error(error);
        return sendError(res, 500);
    }
};

/**
 * Returns true if user is admin
 * @param req
 * @returns {boolean}
 */
export const isAdmin = async (req: IncomingMessage): Promise<boolean> => {
    const session = await getSession({ req });
    if (!session?.user) return false;
    return true;
};

/**
 * Returns true if requester is order receiver app
 * @param req
 * @returns {boolean}
 */
export const isRequesterOrderReceiverApp = (req: IncomingMessage): boolean => {
    const correactBearerHeader = `Bearer ${process.env.ORDER_RECEIVER_APP_TOKEN}`;

    return safeCompare(correactBearerHeader, req.headers['authorization'] ?? '');
};

/**
 * Sends an error response
 * @param res
 * @param errorCode
 * @param details
 */
export const sendError = (res: NextApiResponse, errorCode: number, details?: any) =>
    res.status(errorCode).json({
        error: STATUS_CODES[errorCode],
        details,
    });

/**
 * Checks if errors are validation errors
 * @param errors
 * @returns {boolean}
 */
export const areValidationErrors = (errors: any): errors is ValidationError[] => {
    return errors instanceof Array && errors.every((e) => e instanceof ValidationError);
};

/**
 * Get the raw body of a request
 * @param req
 * @returns {Promise<string>}
 */
export const getRawBody = (req: NextApiRequest): Promise<string | undefined> =>
    new Promise((r) => {
        if (req.body) return r(undefined);

        let buffer = '';

        req.on('data', (chunk: string) => (buffer += chunk));

        req.on('end', () => {
            try {
                r(Buffer.from(buffer).toString());
            } catch {
                r(undefined);
            }
        });
    });

/**
 * Image is a base64
 */
export const isBase64 = (str: string): boolean => {
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(str);
};
