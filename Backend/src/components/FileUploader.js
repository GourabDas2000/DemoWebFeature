import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import { CustomErrorHandler } from './ErrorHandler.js';


dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({storage});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (error) {
          reject(
            new CustomErrorHandler(
              "Cloudinary upload failed",
              500,
              "Cloudinary"
            )
          );
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(file.buffer); 
  });
};



const FileUploader = async(req,res ,next) => {
   const uploadPromises = req.files.map((file) => uploadToCloudinary(file));
   const results = await Promise.all(uploadPromises);

   res.status(201).json({
     message: "Files uploaded successfully",
     uploadedFiles: results.map((result) => ({
       url: result.secure_url,
       public_id: result.public_id,
     })),
   });
}
export {FileUploader , upload};