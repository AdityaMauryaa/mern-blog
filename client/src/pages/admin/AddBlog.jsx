import { useEffect, useState } from 'react'
import { assets ,blogCategories} from '../../assets/assets'
import Quill from 'quill'
import { useRef } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import {parse} from 'marked'
import 'highlight.js/styles/github.css';
const AddBlog = () => {
  const {axios}=useAppContext();
  const [isAdding,setIsAdding]=useState(false);
  const [loading,setLoading]=useState(false);
  const [image , setImage]=useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup'); 
  const editorRef=useRef(null);
  const quillRef=useRef(null);
const [isPublished,setIsPublished ] = useState(false);
const generateContent = async () => {
  if (!title) {
    return toast.error("Please enter the title");
  }
  setLoading(true);
  try {
    const { data } = await axios.post("api/blog/generate", {prompt: title });
    if (data.success) {
      quillRef.current.clipboard.dangerouslyPasteHTML(parse(data.content));

    } else {
      toast.error(data.message || "Failed to generate content");
    }
  } catch (error) {
    toast.error("Server error: " + (error.response?.data?.message || error.message));
  } finally {
    setLoading(false);
  }
};


const onSubmitHandler=async (e)=>{
  try {
    e.preventDefault();
    setIsAdding(true)
    const blog={
      title,
      subTitle,
      description:quillRef.current.root.innerHTML,
      category,isPublished
    }
    const formData=new FormData();
    formData.append('blog',JSON.stringify(blog));
    formData.append('image',image);

    const {data}=await axios.post('/api/blog/add',formData);
    if(data.success){
      toast.success(data.message)
      setImage(false)
      setTitle('')
      quillRef.current.root.innerHTML=''
      setCategory('Startup')
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
  finally{
    setIsAdding(false)
  }
}
useEffect(() => {
  if (!quillRef.current && editorRef.current) {
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['code-block'],   // Add this line to enable code blocks
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean']
        ]
      }
    });
  }
}, []);

  return (
    <form 
    onSubmit={onSubmitHandler}
    className='flex-1 bg-blue-50/50 text-gray-500 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ?assets.upload_area:URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor pointer'/>
          <input 
          onChange={(e)=>setImage(e.target.files[0])}
          type="file" id='image'  required />
        </label>

        <p>Blog title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 border border-gray-300 outline-none rounded' 
        onChange={(e)=>setTitle(e.target.value)} value={title} />
        <p>Sub title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 border border-gray-300 outline-none rounded' 
        onChange={(e)=>setSubTitle(e.target.value)} value={subTitle} />

        <p>Blog descrition</p>
        <div disabled={loading} className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef} ></div>
          {loading && (
            <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
              <div className='w-8 h-8 rounded-full border-2 border-t-white  animate-ping'></div>
            </div>

          )}
          <button type='button' className='absolute bottom-1 right-2 ml-2 
          text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:scale-105 
           hover:underline cursor-pointer transition-all duration-200 ease-in-out'
          onClick={generateContent}>Generate with AI</button>
        </div>
        <p className='mt-4'>Blog Category</p>
        <select onChange={e=>(setCategory(e.target.value))} name="category" id=""
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded '>
          <option value="">Select Category</option>
          {blogCategories.map((category,index)=>{
            return <option key={index} value={category}>{category}</option>
          })}
        </select>
        <div>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} className="scale-125 cursor-pointer"
          onChange={e=>setIsPublished(e.target.checked)}
          />
        </div>
        <button disabled={isAdding} className='text-white px-4 bg-primary/80 rounded hover:scale-105 transition-all duration-300 '>
        {isAdding ? 'Adding blog...' : "Add blog"}
        </button>
      </div>
    </form >
  )
}

export default AddBlog
