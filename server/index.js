import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getHealth, isError } from './contollers/others/Other.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async ()=>{
    const con = await mongoose.connect(process.env.MONGO_URI);
    if(con)
    {
        console.log(`MongoDb Connection Establish..`);
    }

}

app.get("/health",getHealth);

app.post("/signup", async (req,res)=>{
   const {name,email,phone,address,password,rePassword} = req.body;

   if(!password)
   {
    res.status(400).json({
        success:false,
        message:"Password is Required"
    });
   }
   if(password!==rePassword)
   {
    res.status(400).json({
        success:false,
        message:"Password does not match"
    });
   }
   if(!name)
   {
    res.status(400).json({
        success:false,
        message:"Name is Required"
    });
   }
   if(!email)
   {
    res.status(400).json({
        success:false,
        message:"Email is Required"
    });
   }
   if(!phone)
   {
    res.status(400).json({
        success:false,
        message:"Phone is Required"
    });
   }
   if(!address)
   {
    res.status(400).json({
        success:false,
        message:"Address is Required"
    });
   }
});

app.get("*",isError);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    connectDB();
})