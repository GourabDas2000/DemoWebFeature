import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  GlobalErrorHandler,
  CustomErrorHandler,
} from "../src/components/ErrorHandler.js";
import mongoConnection from '../src/components/DatabaseConfig.js';
import { FileUploaderRoute } from '../src/router/FileUploaderRoute.js';


const app = express();
const PORT = process.env.PORT  || 4000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//api endpoint
app.use("/api/file", FileUploaderRoute);

// Database Connection
mongoConnection();

//Handeling Global Error
app.use(GlobalErrorHandler);    

//creating server
app.listen(PORT , (err) => {
    if(err){
        console.log("Something went wrong");
    }
    console.log("App is running on Port -> 4000")
})