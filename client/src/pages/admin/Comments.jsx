import { useEffect ,useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentsTableItem from '../../components/admin/CommentsTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {
  const {axios}=useAppContext()
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Approved')
  const fetchComments = async () => {
    try {
      const {data}=await axios.get('/api/admin/comments')
      if(data.success){
        setComments(data.comments);
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchComments();
  }
  ,[]);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl '>
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button 
          onClick={() => setFilter('Approved')}
          value={'Approved'}
          className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter==="Approved"?'text-green-600': 'text-gray-700'}`}>
            Approved
          </button>
          <button
          onClick={() => setFilter('Not Approved')}
          value={'Not Approved'}
          className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter=== "Not Approved"?'text-red-600': 'text-gray-700'}`}>
            Unapproved
          </button>

        </div>
         </div>
        <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3 xl:px-6'>Blog Title & Comment
              </th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Date
              </th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
  .filter(comment => filter === 'Approved' ? comment.isApproved === true : comment.isApproved === false)
  .map(comment => (
    <CommentsTableItem key={comment._id} comment={comment} fetchComments={fetchComments} />
  ))

            }
          </tbody>
        </table>
        </div>
     

    </div>
  )
}

export default Comments
