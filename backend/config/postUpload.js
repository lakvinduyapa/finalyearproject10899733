import cloudinaryPackage from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = cloudinaryPackage.v2;
import dotenv from "dotenv";
dotenv.config();

//configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png", "jpeg"],
    params:{
        folder: "Liya-Savi",
    },
});

const postupload = multer({
    storage,
});

export default postupload;