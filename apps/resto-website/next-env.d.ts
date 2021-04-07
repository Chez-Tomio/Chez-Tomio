/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            SITE_BASE_URL: string;
            STRIPE_PUBLIC_KEY: string;
            STRIPE_PRIVATE_KEY: string;
            COGNITO_CLIENT_ID: string;
            COGNITO_CLIENT_SECRET: string;
            COGNITO_DOMAIN: string;
        }
    }
}

export {};
