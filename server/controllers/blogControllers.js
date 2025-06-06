import fs from 'fs';
import imagekit from '../config/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js'
import main from '../config/gemini.js';

export const addblog=async(req,res)=>{
    try {
        const {title,description,category,isPublished,subTitle}=JSON.parse(req.body.blog);
        const imageFile=req.file;
        if(!title || !description || !category || !isPublished || !imageFile){
            return res.status(400).json({success:false,message:"Please provide all fields"});
        }
        const fileBuffer=fs.readFileSync(imageFile.path);
        const response =await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder:'/blog'
        })
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {quality:'auto'},
                {format:'webp'},
                {width: '1280'}
            ]
        })
        const image=optimizedImageUrl;
        await Blog.create({
            title,
            subTitle,
            description,
            category,
            isPublished,
            image
        })
        res.json({
            success: true,
            message: "Blog added successfully"  
        })
    } catch (error) {
        console.error('Error in addblogs:', error);
        res.status(500).json({
            success: false,
            message: "Error adding blog",
            error: error.message
        });
    }
}



export const getAllBlogs = async (req, res) => {
    try {
      const blogs=await Blog.find({isPublished:true}).sort({createdAt:-1});
      res.status(200).json({
          success: true,
          message: "Blogs fetched successfully",
          blogs: blogs
      });
    } catch (error) {
        console.error('Error in getAllBlogs:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching blogs",
            error: error.message
        });
    }
}


export const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog: blog
        });
    }
    catch (error) {
        console.error('Error in getBlogById:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching blog",
            error: error.message
        });
    }
}   

export const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        
        await Comment.deleteMany({blog:id});
        await Blog.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });
    }
    catch (error) {
        console.error('Error in deleteBlogById:', error);   
        res.status(500).json({
            success: false,
            message: "Error deleting blog",
            error: error.message
        });
    }
}

export const togglePublish =async (req, res) => {
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();      
        res.status(200).json({
            success: true,
            message: blog.isPublished ? "Blog published successfully" : "Blog unpublished successfully",
            blog: blog
        });     
    }
    catch (error) {
        console.error('Error in togglePublish:', error);
        res.status(500).json({
            success: false,
            message: "Error toggling publish status",
            error: error.message
        });
    }
}

export const addComments=async (req,res)=>{
    try {
        const {blog,name,content}=req.body
        await Comment.create({ blog, name, content });
        res.json({success:true,message:'Comment added for review'})
    } catch (error) {
         res.json({success:false,message:error.message})
    }
}

export const getBlogComments=async (req,res)=>{
    try {
        const {blogId}=req.body;
        const comments = await Comment.find({ blog: blogId }).sort({ createdAt: -1 });
        res.json({success:true,comments})
    } catch (error) {
         res.json({success:false,message:error.message})
    }
}

export const generateContent=async (req,res)=>{
    try {
        const {prompt}=req.body;
        console.log(prompt)
        const content=await main( prompt+ 'This is my title of blog give a detailed content in text format. Also the whatever you have to give as a content as it is getting pasted at content location so dont give okay here is your or something direct content') 
        res.json({success:true,content})
    } catch (error) {
        res.json({success:false,message:error})
        
    }
}