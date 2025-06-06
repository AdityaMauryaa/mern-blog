import userModel from "../models/user.js"
import bcrypt from 'bcryptjs'
export const userSignup=async (req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"Missing details"})
    }
    try {
        const userExist=await userModel.findOne({email});
        if(userExist){
            res.json({success:false,message:"User exists with given email, login instead."})
        }
        const hashPassword=await bcrypt.hash(password,10);
        const user=new userModel({
            name,email,password:hashPassword
        })
        await user.save();
        res.json({success:true,message:"User registration successful"});
    } catch (error) {
        res.json({success:false,message:error.message})
    }
    
}