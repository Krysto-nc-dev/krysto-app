import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Messages from './FeedbackScreens/Messages'
import { useDispatch , useSelector } from 'react-redux'
import Button from '../components/shared/Button'
import { ArrowBigLeftIcon, Trash } from 'lucide-react'


const CartScreen = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()

  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart

  return (
    <>
        <h1 className='text-2xl text-gray-700'>Votre Pannier</h1>
        <div className='mt-4'>
             {cartItems.length === 0 ? (
              <>
              <div className='mb-4'>

               <Messages type={'warning'}  message={"Votre pannier est vide"} />
              </div>
              <Link to={'/krysto-shop'}>
               <Button icon={ArrowBigLeftIcon} version={"primary"} >Continuer mes achats</Button> 
              </Link>
              </>
            
            ) : (
              <div>
                {cartItems.map((cartItem) => (
                  <>
                  <div key={cartItem._id} className='flex items-center justify-between mb-4  '>
                    <div className='flex items-center gap-10'>
                      <img className='w-12 h-12' src={cartItem.image} alt={cartItem.name} />
                      <div className='ml-4'>
                        <h2 className='text-sm text-gray-700'>{cartItem.name}</h2>
                        <p className='text-sm text-gray-500'>{cartItem.qty} x {cartItem.price} </p>
                      </div>
                      <div className='ml-4'>
                        <h2 className='text-sm text-gray-700'>Sous-total</h2>
                        <p className='text-sm text-gray-500'>{cartItem.qty * cartItem.price } </p>
                      </div>
                    </div>
                     
                    <Button version='danger' icon={Trash} onClick={() => dispath({type: 'cart/removeItem', payload: cartItem._id})} ></Button>
                  </div>
                  <div className="border"></div>
                  </>
                ))}
              </div>
             )}
        </div>
    </>
  )
}

export default CartScreen