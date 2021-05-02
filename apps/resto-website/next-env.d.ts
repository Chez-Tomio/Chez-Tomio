/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            SITE_BASE_URL: string;
            ORDER_RECEIVER_APP_TOKEN: string;
            STRIPE_PRIVATE_KEY: string;
            STRIPE_ENDPOINT_SECRET: string;
            COGNITO_CLIENT_ID: string;
            COGNITO_CLIENT_SECRET: string;
            COGNITO_DOMAIN: string;
        }
    }
}

export {};
