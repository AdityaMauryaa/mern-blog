import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-t-white  border-primary'>
            
        </div>
        Loading...
        
    </div>
  )
}

export default Loader
