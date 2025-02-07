import bcrypt from "bcrypt";
import User from './../models/User.js'
const signUp = async (req,res)=>{
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
 
    const salt = bcrypt.genSaltSync(10);
    try{
     const newUser = new User({
         name,
         email,
         phone,
         address,
         password: bcrypt.hashSync(password,salt)
        });
        const saveUser = await newUser.save();
        return res.json({
         success:true,
         message:"Signup Successfully",
         data:{
            name:saveUser.name,
            email:saveUser.email,
            phone:saveUser.phone,
            address:saveUser.address,
         }
        });
    }
   catch(error){
     res.status(400).json({success:false, message:error.message});
   }
}

const login = async (req,res)=>{

}

export {signUp, login}