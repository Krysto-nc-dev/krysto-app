import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const PublicLayout = () => {
  return (


    <div className='bg-gray-300 text-gray-800'>
      <Header/>
      <div className='py-7 px-10  min-h-[100vh]'>
        <Outlet />
      </div>
      <Footer/>
    </div>
 
  )
}

export default PublicLayout