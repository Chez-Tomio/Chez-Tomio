/*
 *** This file contains the Mongoose Model to represent a NextAuth user
 *** Users should not be create using this model
 *** It's purpose is to query and add metadata to existing NextAuth users
 */
import { Document, Model, model, models, Schema } from 'mongoose';

import { DocumentTimestamps } from '../utils';

export type IUser = {
    name: string;
    email: string;
} & DocumentTimestamps;

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

UserSchema.pre('init', () => {
    throw new Error('This model should not be used to create users');
});

export const User: Model<IUser & Document> = models.User ?? model('User', UserSchema, 'users');
