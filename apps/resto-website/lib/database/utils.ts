import mongoose from 'mongoose';

export interface Document extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
}

export interface ILocalizedString {
    fr: string;
    en: string;
}

export interface DocumentTimestamps {
    createdAt: Date;
    updatedAt: Date;
}

export const LocalizedStringSchema = (required: boolean) => ({
    fr: {
        type: String,
        required,
    },
    en: {
        type: String,
        required,
    },
});

export const IntegerSchema = {
    type: Number,
    required: true,
    validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
    },
};

export const localizedStringToString = (localizedString: Partial<ILocalizedString>): string =>
    [localizedString.fr, localizedString.en].filter((s) => s && s.trim() !== '').join(' / ');
