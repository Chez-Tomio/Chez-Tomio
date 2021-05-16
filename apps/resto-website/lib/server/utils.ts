import { STATUS_CODES } from 'http';
import { GetServerSideProps } from 'next';

import { isStoreEnabled } from '../../config/global.json';

export const requiresStoreToBeEnabled = (
    getServerSideProps: GetServerSideProps,
): GetServerSideProps => async (context) => {
    const { res } = context;
    if (!isStoreEnabled) {
        res.statusCode = 403;
        res.end(STATUS_CODES[res.statusCode]);
        return { props: {} };
    }
    return getServerSideProps(context);
};
