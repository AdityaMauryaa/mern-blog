import React from 'react'
import { assets } from '../../assets/assets';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
const Login = () => {
  const {axios,setToken,navigate,setGlobalName}=useAppContext();
  const  [email, setEmail] = useState('');
  const  [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post('/api/admin/login',{email,password})
      if(data.success){
        setToken(data.token)
        localStorage.setItem('globalName', data.name);
        setGlobalName(data.name)
        localStorage.setItem('token',data.token)
        axios.defaults.headers.common['Authorization']=data.token;
        navigate('/admin')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className={'flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 to bg-red-300' }>
      
      <div className='w-full max-w-sm p-6 max-md:m-6 border bg-gray-900 border-primary/30 shadow-xl shadow-primary/30 rounded-lg'>
          <div className='flex flex-col items-center justify-center'> 
      <div onClick={()=>navigate('/')} className='cursor-pointer text-blue-500  rounded-full px-3'>Return to homepage</div>
            <div className='w-full py-4 text-center'>
              <h1 className='text-4xl font-bold mb-2 text-white'>
                Login</h1>
              <p className='font-light text-indigo-400'>Enter your credentials to access the admin panel</p>
            </div>
            <form onSubmit={handleSubmit} className='w-full sm:max-w-md text-gray-600 '>
              <div className='flex items-center mb-4 gap-3 text-white rounded-2xl bg-[#333A5C] px-4 py-2'>
              <img src={assets.mail_icon} alt="email icon" className="w-5 h-5" />
              <input 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder='Enter your email'
                className='bg-transparent flex-1 outline-none text-white placeholder:text-gray-300'
              />
            </div>


              <div className='flex items-center mb-4 gap-3 text-white rounded-2xl bg-[#333A5C] px-4 py-2'>
                <img src={assets.lock_icon} alt="password icon" className="w-5 h-5" />
                <input 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  required
                  placeholder='Enter your password'
                  className='bg-transparent flex-1 outline-none text-white placeholder:text-gray-300'
                />
              </div>

              <button type='submit' className='w-full py-1 font-medium bg-gradient-to-r from-indigo-500 to-indigo-900
               text-white rounded-full cursor-pointer hover:scale-95
               '>Login</button>
            </form>
             <div className='mt-4 text-sm'>
            <p className='text-gray-400'>Don't have an account?
              <span
                className='text-blue-500 font-semibold cursor-pointer ml-1 underline'
                onClick={() => navigate('/admin/register')}
              >
                Register
              </span> here
            </p>
            
          </div>
          </div>
      </div>
    </div>
  )
}

export default Login
