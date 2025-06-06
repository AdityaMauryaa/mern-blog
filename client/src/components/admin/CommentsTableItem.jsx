import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
const CommentsTableItem = ({ comment, fetchComments }) => {
    const {axios}=useAppContext();
  const { blog, createdAt, _id, isApproved, content, name } = comment; 
  const blogDate = new Date(createdAt);

  const approveComment = async () => {
    try {
        const {data}=await axios.post('api/admin/approve-comment',{id:_id})
        if(data.success){
             fetchComments();
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
      
    }
  };

  const deleteComment = async () => {
    try {
        const confirm=window.confirm("Are you sure to delete this comment?")
        if(!confirm){
            return ;
        }
        const {data}=await axios.post('api/admin/delete-comment',{id:_id})
        if(data.success){
             fetchComments();
            toast.success(data.message)
        }else toast.error(data.message)
    } catch (error) {
       toast.error(error.message)
    }
  };

  return (
    <tr className='border-y border-gray-300'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog:</b> {blog?.title || 'N/A'}
        <br /><br />
        <b className='font-medium text-gray-600'>Name:</b> {name || 'Anonymous'}
        <br />
        <b className='font-medium text-gray-600'>Comment:</b> {content}
      </td>
      <td className='px-6 py-4 max-sm:hidden'>
        {blogDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </td>
      <td className='px-6 py-4 max-sm:hidden'>
        <div className='inline-flex items-center gap-4'>
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              alt="approve"
              className='w-5 hover:scale-110 transition-all cursor-pointer'
              onClick={approveComment}
              title="Approve Comment"
            />
          ) : (
            <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
              Approved
            </p>
          )}
          <img
            src={assets.bin_icon}
            alt="delete"
            className='w-5 hover:scale-110 transition-all cursor-pointer'
            onClick={deleteComment}
            title="Delete Comment"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentsTableItem;