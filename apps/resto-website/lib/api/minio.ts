import * as Minio from 'minio';

/**
 * Initialize Minio client
 */
export const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: 443,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
} as Minio.ClientOptions);

/**
 * Upload image to Minio
 * @param imageName
 * @param base64
 * @returns {Promise<string>}
 */
export async function uploadImage(imageID, base64, folder) {
    const fileName = `${folder}/${imageID}.${base64.split(';')[0].split('/')[1]}`;
    const buf = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    await minioClient.putObject(
        `${process.env.MINIO_BUCKET}`,
        fileName,
        buf,
        Buffer.byteLength(buf),
        { 'Content-Type': base64.split(';')[0].split(':')[1] },
    );
    return `https://storage.cheztomio.com/${process.env.MINIO_BUCKET}/${fileName}`;
}

/**
 * Delete file from Minio
 */
export async function deleteFile(fileUrl) {
    await minioClient.removeObject(
        `${process.env.MINIO_BUCKET}`,
        fileUrl.replace(`https://storage.cheztomio.com/${process.env.MINIO_BUCKET}/`, ''),
    );
}
