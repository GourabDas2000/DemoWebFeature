import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();
const url = process.env.MONGO_URL

const mongoConnection = async() => {
    try{
        const response = await mongoose.connect(url);
    }catch(error){
        console.log("Error occured in database connection" , error.message);
        throw new error;
    }
}

export default mongoConnection;