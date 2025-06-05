import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
import dotenv from 'dotenv'
import Comment from '../models/comment.js'
export const adminLogin = async (req, res) => {
    try{
        const {email, password} = req.body;
    console.log("ENV_EMAIL:", process.env.ADMIN_EMAIL);
    console.log("ENV_PASSWORD:", process.env.ADMIN_PASSWORD);
    console.log("REQ_EMAIL:", email);
    console.log("REQ_PASSWORD:", password);
        if(!email || !password){
            return res.status(400).json({success:false,message: "Please provide all fields"});
        }else if(email !== process.env.ADMIN_EMAIL || password !==process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false,message: "Invalid credentials"});
        }else{
            const token=jwt.sign(
                {email},
                process.env.JWT_SECRET,
                {expiresIn: '1d'}
            );
            return res.status(200).json({
                success: true,
                message: "Login successful",
                token: token
            });
        }
    }catch(error){
        console.error('Error in login:', error);
    }
}

export const getAllBlogs=async(req,res)=>{
    try {
        const blogs=await Blog.find({}).sort({createdAt:-1})
        res.json({success:true,blogs});
    } catch (error) {
        res.json({success:false,error:error.message});       
    }
}

export const getAllComments= async(req,res)=>{
    try {
        const comments=await Comment.find({}).populate("blog").sort({createdAt:-1});
         res.json({success:true,comments});
    } catch (error) {
        res.json({success:false,error:error.message});       
    }
}

export const getDashboard= async(req,res)=>{
    try {
        const recentBlogs=await Blog.find({}).sort({createdAt:-1}).limit(7);
        const blogs =await Blog.countDocuments();
        const comments=await Comment.countDocuments();
        const drafts=await Blog.countDocuments({isPublished:false});
        const dashboardData={
            blogs,comments,drafts,recentBlogs
        }
        res.json({success:true,dashboardData})
    } catch (error) {
        res.json({success:false,error:error.message})
        
    }
}
export const deleteCommentById= async(req,res)=>{
    try {
        const {id}=req.body;
        await Comment.findByIdAndDelete(id);
        res.json({succes:true,message:"Comment deleted successfully"});
    } catch (error) {
          res.json({success:false,error:error.message})
    }
}
export const approveCommentById= async(req,res)=>{
    try {
        const {id}=req.body;
        await Comment.findByIdAndUpdate(id,{isApproved:true});
        res.json({succes:true,message:"Comment approved successfully"});
    } catch (error) {
         res.json({success:false,error:error.message})        
    }
}
