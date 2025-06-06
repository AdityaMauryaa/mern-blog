import React from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import {Routes, Route} from 'react-router-dom'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import SignUp from './components/admin/SignUp'
const App = () => {
  const {token}=useAppContext();
  
  return (
    <div>
      <Toaster/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/admin/login" element={<Login/>} />
      <Route path="/admin/register" element={<SignUp/>} />
      <Route path='/admin' element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route path='addBlog' element={<AddBlog/>} />
        <Route path='listBlog' element={<ListBlog/>} />
        <Route path='comments' element={<Comments/>} />
        <Route path='login' element={<Login/>} />
      </Route>
      </Routes >
       
    </div>
  )
}

export default App
