import { Schema, model, connect, connection, Document } from 'mongoose';

export async function connectToDatabase() {
    if ([0, 3].includes(connection.readyState))
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
});

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
}

export const User = model<IUser>('User', UserSchema);
