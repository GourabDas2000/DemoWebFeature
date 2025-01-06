import express from 'express';
import { asyncHandler } from '../components/ErrorHandler.js';
import { FileUploader , upload } from '../components/FileUploader.js';

const FileUploaderRoute = express.Router();

FileUploaderRoute.post("/upload", upload.array("files"), asyncHandler(FileUploader));

export {FileUploaderRoute};