import { cloudinary } from "@/lib/cloudinary";
import { CloudinaryUploadReturnObject } from "@/types/cloudinaryUpload";
/**
 * Generate a signed URL for uploading an image to Cloudinary
 * @param {string} folder - Folder where the image should be stored
 * @returns {CloudinaryUploadReturnObject} - { signature, api_key, cloud_name, upload_preset, timestamp }
 */
export const generateSignedUrl = (folder:string = 'resume'): CloudinaryUploadReturnObject => {
    const timestamp = Math.round(new Date().getTime() / 1000) - 55*60;
    const paramsToSign = {
        timestamp,
        folder,
    };

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!);

    return {
        signature,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
        timestamp,
        folder,
    };
};
