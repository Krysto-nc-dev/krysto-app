import { Outlet } from 'react-router-dom'


import Header from '../publicLayout/Header'
import Footer from '../publicLayout/Footer'

const UserLayout = () => {
  return (


    <div className='bg-gray-300 text-gray-800'>
      {/* <UserHeader/> */}
      <Header/>
      <div className='py-7 px-10  min-h-[100vh]'>
        <Outlet />
      </div>
      <Footer/>
      {/* <UserFooter/> */}
    </div>
 
  )
}

export default UserLayout