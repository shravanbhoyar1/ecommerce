import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

import { jwtVerifyMiddleware,checkRoleMiddleware } from './middleware/auth.js';
import { getHealth, isError,test} from './contollers/Other.js'
import { signUp, login} from './contollers/User.js';
import { postProducts } from './contollers/Product.js';

app.get("/health",getHealth);

app.post("/signup", signUp);
app.post("/login",login);
app.get("/test",test);
app.post("/product",jwtVerifyMiddleware,checkRoleMiddleware,postProducts);


app.get("*",isError);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    connectDB();
})