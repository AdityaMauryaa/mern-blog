import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex justify-center flex-col items-center text-center space-y-4 my-10 px-0'
      aria-label="Newsletter Subscription Section">
      <h1 className='md:text-4xl text-2xl text-gray-500/80 font-semibold'>Missed a blog!</h1>
      <p className='md:text-lg text-gray-400'> <span className='text-primary'>Subscribe</span> here to get latest updates</p>
     <form action="" className='flex items-center justify-between max-w-lg w-full border border-gray-300 bg-white rounded-full overflow-hidden max-sm:flex-col max-sm:space-y-2 max-sm:border-none'>
            <input type="text" placeholder='Enter you email address' required
             className='w-full pl-4 outline-none text-gray-500'/>
            <button type='submit' className='bg-primary/70 text-white px-6 py-2 m-1 rounded-full hover:scale-105 hover:bg-primary/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter
