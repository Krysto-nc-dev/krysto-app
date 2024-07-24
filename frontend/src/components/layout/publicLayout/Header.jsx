import {
  CarIcon,
  Gem,
  HomeIcon,
  LogIn,
  LogOut,
  MenuIcon,
  Newspaper,
  PhoneForwarded,
  PowerOffIcon,
  RecycleIcon,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  User2Icon,
  UserCircle,
  X,
} from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsBasket } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from "react";
import { useLogoutMutation } from '../../../slices/userApiSlice'
import { logout } from '../../../slices/authSlice'
import Button from '../../shared/Button'
const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      console.log('logout')
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header className=" py-3 bg-gray-800 relative mx-auto">
      <nav className="flex gap-2 text-sm items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to={'/'}>
            {/* <img className="h-12" src={logoKrysto} alt="logo de Kryto" /> */}
          </Link>
          <div className="hidden lg:flex gap-7 mt-3">
            <Link
              className="flex items-center text-primaryColor hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/'}
            >
              <HomeIcon className="w-[20px] mr-1" /> Accueil
            </Link>
            <Link
              className="flex items-center text-primaryColor hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/krysto-shop'}
            >
              <ShoppingBasket className="w-[20px] mr-2" /> Nos produits
            </Link>
            <Link
              className="flex items-center text-primaryColor hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/initiations'}
            >
              <RecycleIcon className="w-[20px] mr-2" /> Initiations
            </Link>
            <Link
              className="flex items-center text-primaryColor hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/blog'}
            >
              <Newspaper className="w-[20px] mr-2" /> Blog
            </Link>
            <Link
              className="flex items-center text-primaryColor hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/contacts'}
            >
              <PhoneForwarded className="w-[20px] mr-2" /> Nous contacter
            </Link>
            <Link
              className="flex items-center text-primaryColor hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/a-propos'}
            >
              <Gem className="w-[20px] mr-2" /> A propos
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex gap-5 ">


          {userInfo ? (

            <div className='hidden lg:flex gap-5 '>
              <Popover className="relative mt-3 mr-5">
                {({ open }) => (
                  <>
                    <Popover.Button className="p-1.5 rounded-sm inline-flex items-center text-primaryColor hover:text-opacity-100 focus:outline-none active:bg-gray-100">
                      <User2Icon fontSize={24} className="text-gray-700" />
                      {cartItems.length > 0 && (
                        <span className="inline-block bg-secondaryColor text-white rounded-full px-2 py-1 ml-2 text-xs">
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                      )}
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-48">
                        <div className="bg-primaryColor rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5  ">

                          <Link className='flex items-center gap-3' to={'/pannier'}>
                            <ShoppingCart />   Pannier
                            <span className="inline-block bg-secondaryColor text-white rounded-full px-2 py-1 ml-2 text-xs">
                              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                          </Link>
                        </div>
                        <div className="bg-primaryColor rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                          <Link className='flex items-center gap-3' to={'/mon-profile'}>
                            <UserCircle />  Mon Profile
                          </Link>
                        </div>
                        <div className="bg-primaryColor rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                          <Link onClick={logoutHandler} className=" px-4 py-2 text-red-700 hover:bg-gray-100 flex items-center hover:no-underline "> <LogOut className="mr-2" /> Déconnexion</Link>
                        </div>

                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>

          ) : (
            <>

              <Link
                className="flex items-center  text-primaryColor hover:text-secondaryColor hover:font-bold transition hover:-translate-y-0.5 duration-150"
                to={'/pannier'}
              >
                <ShoppingCart className="w-5 h-5 " />
                {cartItems.length > 0 && (
                  <span className="inline-block bg-secondaryColor text-white rounded-full px-2 py-1 ml-2 text-xs">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </Link>
              <Link
                to={'/connexion'}
                className="flex items-center px-4 py-2  mr-7 text-gray-700 bg-secondaryColor hover:bg-opacity-90 hover:text-gray-900 rounded-md transition hover:-translate-y-0.5 duration-150"
              >
                <LogIn className="w-[20px] mr-2" />
                Connexion
              </Link>
            </>
          )}

        </div>

        {/* Bouton du menu burger */}
        <button
          onClick={toggleMobileMenu}
          className="flex items-center px-4 py-2 text-gray-700 transition duration-150 lg:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-0 left-0 w-full bg-primaryColor lg:hidden z-50 p-4"
        >
          <div className="flex justify-between items-center">
            <Link to={'/'}>
              {/* <img className="h-12" src={logoKrysto} alt="logo de Kryto" /> */}
            </Link>

            {/* Icône de fermeture */}
            <button onClick={toggleMobileMenu}>
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col mt-4 space-y-4">
            <Link
              className="flex items-center text-gray-700 hover:text-secondaryColor hover:font-bold"
              to={'/'}
              onClick={toggleMobileMenu}
            >
              <HomeIcon className="w-[20px] mr-2" /> Accueil
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-secondaryColor hover:font-bold"
              to={'/krysto-shop'}
              onClick={toggleMobileMenu}
            >
              <ShoppingBasket className="w-[20px] mr-2" /> Nos produits
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-secondaryColor hover:font-bold"
              to={'/initiations'}
              onClick={toggleMobileMenu}
            >
              <RecycleIcon className="w-[20px] mr-2" /> Initiations
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-secondaryColor hover:font-bold"
              to={'/blog'}
              onClick={toggleMobileMenu}
            >
              <Newspaper className="w-[20px] mr-2" /> Blog
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-secondaryColor hover:font-bold"
              to={'/contacts'}
              onClick={toggleMobileMenu}
            >
              <PhoneForwarded className="w-[20px] mr-2" /> Nous contacter
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-secondaryColor hover:font-bold"
              to={'/a-propos'}
              onClick={toggleMobileMenu}
            >
              <Gem className="w-[20px] mr-2" /> A propos
            </Link>

            <Link
              className="flex items-center text-gray-700 hover:text-gray-900 hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/pannier'}
            >
              <BsBasket className="w-5 h-5 mr-2" /> Panier
              {cartItems.length > 0 && (
                <span className="inline-block bg-secondaryColor text-white rounded-full px-2 py-1 ml-2 text-xs">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-secondaryColor hover:font-bold"
              to={'/mon-profile'}
              onClick={toggleMobileMenu}
            >
              <UserCircle className="w-[20px] mr-2" /> Mon Profile
            </Link>

            {userInfo ? (
              <Button
                version={"danger"}
                icon={PowerOffIcon}
                onClick={logoutHandler}
              >
                Deconnexion
              </Button>
            ) : (
              <Link
                className="flex items-center justify-center text-gray-700 bg-secondaryColor text-gray-700 hover:bg-opacity-90 rounded-md py-2 mt-4"
                to={'/connexion'}
                onClick={toggleMobileMenu}
              >
                <LogIn className="w-[20px] mr-2" /> Connexion
              </Link>
            )}


          </div>
        </div>
      )}

    </header>
  )
}

export default Header
