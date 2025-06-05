import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {
  const {setInput,input}=useAppContext();
  const inputRef=useRef();
  console.log(input)
  const onClear=(e)=>{
     e.preventDefault(e);
    setInput('')
    inputRef.current.value=""
  }
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    setInput(inputRef.current.value)
  }
  return (
    <div className='mx-8 sm:mx-16 x1:mx-24 relative'>
    <div className='text-center mt-20 mb-8'>
      <div className='inline-flex items-center gap-4 px-6 py-1.5 mb-4
       border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
        <p>New: AI feature integrated</p>
        <img src={assets.star_icon} alt="" className='w-2.5'/>
      </div>
      <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16'>
        Your own <span className='text-primary'> blogging</span> <br /> platform
        </h1>
        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
            This is your space where you can share your thoughts, ideas, and stories with the world.
            <br />
            Whether you're a seasoned writer or just starting out, our platform provides the tools you need to create and manage your own blog.
            <br />
            <span className='text-primary'>Join us today and start your blogging journey!</span>
        </p>
        <form 
        onSubmit={onSubmitHandler}
         className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border
        border-gray-300 bg-white  overflow-hidden rounded-full'>
            <input ref={inputRef} type="text" placeholder='Search blogs by title or category...' required
             className='w-full pl-4 outline-none text-gray-500'/>
            <button type='submit' className='bg-primary/85 text-white px-8 py-2 m-1.5 rounded-full hover:scale-105 hover:bg-primary transition-all cursor-pointer'>Search</button>
        </form>

        <div className='text-center m-4'>
        {input && (
  <button
    onClick={onClear}
    className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer mt-4'
  >
    Clear Search
  </button>
)}
        </div>
    </div>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-60'/>
    </div>
  )
}

export default Header
