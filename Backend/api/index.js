import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoConnection from '../src/components/DatabaseConfig.js';

const app = express();
const PORT = process.env.PORT  || 4000;

dotenv.config();
app.use(cors());
app.use(express.json());

//api endpoint
app.get("/", (req, res) => {
  res.send("Hello from Express app!");
});


// database connection
try{
    mongoConnection();
    console.log("Database is Connected");
}catch(error){
    console.log(error.message);
}

//creating server
app.listen(PORT , (err) => {
    if(err){
        console.log("Something went wrong");
    }
    console.log("App is running on Port -> 4000")
})