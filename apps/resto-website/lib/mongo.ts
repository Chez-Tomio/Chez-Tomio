import { Schema, model, connect, connection, Document } from 'mongoose';

export async function connectToDatabase() {
    if ([0, 3].includes(connection.readyState)) {
        await connect('mongodb://localhost/resto-website', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
}

export const User = model<IUser>('User', UserSchema);
