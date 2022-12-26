import { STATUS_CODES } from 'http';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';

const { globalConfig } = getConfig().publicRuntimeConfig;

/**
 * Wrapper for Next.js getServerSideProps in pages that need store to be enabled
 * @param getServerSideProps
 */
export const requiresStoreToBeEnabled =
    (getServerSideProps: GetServerSideProps): GetServerSideProps =>
    async (context) => {
        const { res } = context;
        if (!globalConfig.isStoreEnabled) {
            res.statusCode = 403;
            res.end(STATUS_CODES[res.statusCode]);
            return { props: {} };
        }
        return getServerSideProps(context);
    };
