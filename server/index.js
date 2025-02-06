import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const app = express();
app.use(cors());


const connectDB = async ()=>{
    const con = await mongoose.connect(process.env.MONGO_URI);
    if(con)
    {
        console.log(`MongoDb Connection Establish..`);
    }

}
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    connectDB();
})