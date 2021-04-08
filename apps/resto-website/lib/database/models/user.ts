/*
 *** This file contains the Mongoose Model to represent a NextAuth user
 *** Users should not be create using this model
 *** It's purpose is to query and add metadata to existing NextAuth users
 */

import { LeanDocument, Model, model, models, Schema } from 'mongoose';

import { Document, DocumentTimestamps } from '../utils';

export type IUser = {
    name: string;
    email: string;
    isAdmin?: boolean;
};

export type IUserDocument = IUser & Document & DocumentTimestamps;

export type ISerializedUser = Omit<LeanDocument<IUserDocument>, '_id'> & { _id: string };

export const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const User: Model<IUserDocument> = models.User ?? model('User', UserSchema, 'users');
