import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { assets, blog_data, comments_data } from '../assets/assets'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {
  const {id}=useParams();
  
  const {axios}=useAppContext();
  
  const [data,setData] = useState(null);
  const [comment,setComments] = useState([]);
  const [name,setName] = useState('');
  const [content,setContent] = useState('');

  const fetchBlogData = async () => {
    try {
      const {data}=await axios.get(`/api/blog/${id}`)
      data.success?setData(data.blog):toast.error(data.message);

    } catch (error) {
      toast.error(error.message)
    }

  }
  const fetchComments = async () => {
    try {
       const {data}=await axios.post(`/api/blog/comments`,{blogId:id})
       if(data.success){
        setComments(data.comments)
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const addComment = async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post(`/api/blog/add-comment`,{blog:id,name,content})
      if(data.success){
        toast.success(data.message)
        fetchComments()
        setName('')
        setContent('')
      }
    } catch (error) {
      toast.error(data.error)
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }
  , []);

  return data?(

    <div className='relative '>
      {/* Background gradient image */}
      <img src={assets.gradientBackground} alt="" className='absolute top-0 -z-1' />
      <Navbar/>
      {/* Main content of the blog post */}
      <div className='text-center mt-10 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on : {moment(data.createdAt).format('Do MMMM YYYY, h:mm:ss a')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto
        text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-1g truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full
         mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>{data.author?data.author:'Unknown'}</p>
      </div>

      <div className='mx-5 max-w-6xl md:mx-auto my-10 '>
          <img src={data.image} alt="img" className=' mb-5 border-4 border-gray-300 rounded-3xl' />
          
          <div 
            style={{
                    backgroundImage: `url(${assets.gradientBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
            className='rich-text max-w-4xl mx-auto  ' dangerouslySetInnerHTML=
            {{__html: data.description}}>
             
          </div>
          {/* comments */}
          <div className='mb-10 max-w-3xl mx-auto mt-30'>
            <p className='font-semibold mb-4'>Comments  ({comment.length})</p>
            
            <div className='flex flex-col gap-4'>
              {comment.map((item,index)=>{
                console.log(item);
                return(<div key={index} className='relative bg-primary/2 border border-primary/5 max-w-3xl p-4 rounded text-gray-600'>
                 <div>
                  <img src={assets.user_icon} alt="img" className='w-6' />
                  <p className='font-medium'>{item.name}</p>
                 </div>
                 <p className='text-sm max-w-md ml-8'>{item.content}</p>
                 <div className='absolute right-4 bottom-3 
                 flex items-center gap-2 text-xs '>
                  {moment(item.createdAt).format('Do MMMM YYYY, h:mm:ss a')}</div>
                </div>
                )
              })}
            </div>
            {/* Comment form */}
            <div className='max-w-3xl mx-auto '>
                <p className='font-semibold mb-4 mt-4'>Add your comment</p>
                <form onSubmit={addComment} className='flex flex-col items-start max-w-lg gap-4 '>
                  <input 
                  onChange={(e)=>setName(e.target.value)}
                  value={name}
                  type="text" placeholder='Name' required className='w-full
                  p-2 border border-gray-300 rounded outline-none'/>

                  <textarea
                  onChange={(e)=>setContent(e.target.value)}
                  value={content}
                   placeholder='comment' className='w-full p-2 border
                   border-gray-300 rounded outline-none h-48' required></textarea>
                   <button type='submit' className='bg-primary text-white rounded px-2 hover:scale-102 transition-all cursor-pointer'>Submit </button>
                </form>
            </div>
            {/* social icons where you can share the blog post */}
            <div className='my-24 max-w-3xl mx-auto'>
                <p className='font-semibold my-4'>Share this article to..</p>
                <div className='flex'>
                    <img src={assets.facebook_icon} width={50} alt="" />
                    <img src={assets.twitter_icon}  width={50} alt="" />
                    <img src={assets.googleplus_icon} width={50} alt="" />
                </div>
            </div>
          </div>
      </div>
      <Footer/>
    </div>
  ):<div>
     <Loader />
    </div>
}
export default Blog