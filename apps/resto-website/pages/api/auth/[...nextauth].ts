import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import NextAuth, { NextAuthOptions } from 'next-auth';
// import EmailProvider from 'next-auth/providers/email';
import CognitoProvider from 'next-auth/providers/cognito';

const client = new MongoClient(process.env.MONGO_URI ?? '');
const clientPromise = client.connect();

export const authOptions: NextAuthOptions = {
    providers: [
        // EmailProvider({
        //     server: {
        //         host: process.env.EMAIL_SERVER_HOST,
        //         port: process.env.EMAIL_SERVER_PORT,
        //         auth: {
        //             user: process.env.EMAIL_SERVER_USER,
        //             pass: process.env.EMAIL_SERVER_PASSWORD,
        //         },
        //     },
        //     from: process.env.EMAIL_FROM,
        // }),
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID ?? '',
            clientSecret: process.env.COGNITO_CLIENT_SECRET ?? '',
            issuer: process.env.COGNITO_ISSUER ?? '',
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    // callbacks: {
    //     async signIn({ user, account, profile, email, credentials }) {
    //         console.log(user, account, profile, email, credentials);
    //         return true;
    //     },
    // },
};

export default NextAuth(authOptions);
