import React from 'react'
import { useGetPresentationsQuery } from '../../slices/presentationApiSlice'
import { FaClock } from 'react-icons/fa'
import Button from '../../components/shared/Button'
import { Edit, EyeIcon, PlayCircleIcon, PlusCircleIcon, Trash } from 'lucide-react'
import Loader from '../FeedbackScreens/Loader'

const AdminPresentationsScreen = () => {
  const { data: presentations, error: presentationsError, isLoading: presentationsLoading } = useGetPresentationsQuery()

  console.log(presentations);

  if (presentationsLoading) {
    return <Loader/>
  }

  if (presentationsError) {
    return <p>Error: {presentationsError.message}</p>
  }

  return (
    <div className='p-2 '>

      <div className="flex items-center justify-between mb-6">
      <h1 className='text-xl '>Presentations</h1>
        <Button  icon={PlusCircleIcon} version={"success"} />

      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {presentations.map((presentation) => (
          <div key={presentation._id} className='bg-white shadow-lg rounded-lg overflow-hidden'>
            <img 
              src={presentation.images[0] || '/uploads/no-photo.png'} 
              alt={presentation.title} 
              className='w-full h-48 object-cover' 
            />
            <div className='p-6'>
              <h2 className='text-xl font-semibold mb-2'>{presentation.title}</h2>
              <p className='text-gray-600 mb-4'>{presentation.description}</p>
              <div className='flex items-center text-gray-500'>
                <FaClock className='mr-2' />
                <span>Temps estimée: {presentation.estimatedDuration} minutes</span>
              </div>
              <div className='mt-4 flex items-center justify-between px-10'>
          
                <Button url={`/presentation/${presentation._id}`} icon={PlayCircleIcon} version={"primary"}/>
                <Button icon={Edit} version={"warning"}/>
                <Button icon={Trash} version={"danger"}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPresentationsScreen
