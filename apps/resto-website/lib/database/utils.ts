import mongoose from 'mongoose';

/**
 * Document interface to be used as a base for all documents in the database
 */
export interface Document extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
}

/**
 * Document interface for timestamps
 */
export interface DocumentTimestamps {
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Localized string interface
 */
export interface ILocalizedString {
    fr: string;
    en: string;
}

/**
 * Localized string schema
 */
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

/**
 * Turn a localized string into a string (combines both languages using a "/")
 * @param localizedString
 * @returns {string}
 */
export const localizedStringToString = (localizedString: Partial<ILocalizedString>): string =>
    [localizedString.fr, localizedString.en].filter((s) => s && s.trim() !== '').join(' / ');
