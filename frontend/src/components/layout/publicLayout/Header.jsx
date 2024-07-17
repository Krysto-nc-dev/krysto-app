import {
  Gem,
  HomeIcon,
  LogIn,
  MenuIcon,
  Newspaper,
  PhoneForwarded,
  RecycleIcon,
  ShoppingBasket,
  X,
} from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)

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

  return (
    <header className=" py-3 bg-primaryColor relative mx-auto">
      <nav className="flex gap-2 text-sm items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to={'/'}>
            {/* <img className="h-12" src={logoKrysto} alt="logo de Kryto" /> */}
          </Link>
          <div className="hidden lg:flex gap-7 mt-3">
            <Link
              className="flex items-center text-gray-700 hover:text-gray-900 hover:font-bold"
              to={'/'}
            >
              <HomeIcon className="w-[20px] mr-1" /> Accueil
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-gray-900 hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/krysto-shop'}
            >
              <ShoppingBasket className="w-[20px] mr-2" /> Nos produits
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-gray-900 hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/initiations'}
            >
              <RecycleIcon className="w-[20px] mr-2" /> Initiations
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-gray-900 hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/blog'}
            >
              <Newspaper className="w-[20px] mr-2" /> Blog
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-gray-900 hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/contacts'}
            >
              <PhoneForwarded className="w-[20px] mr-2" /> Nous contacter
            </Link>
            <Link
              className="flex items-center text-gray-700 hover:text-gray-900 hover:font-bold transition hover:-translate-y-0.5 duration-150"
              to={'/a-propos'}
            >
              <Gem className="w-[20px] mr-2" /> A propos
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex">
          <Link
            to={'/connexion'}
            className="flex items-center px-4 py-2 mt-3 mr-7 text-gray-700 bg-secondaryColor hover:bg-opacity-90 hover:text-gray-900 rounded-md transition hover:-translate-y-0.5 duration-150"
          >
            <LogIn className="w-[20px] mr-2" />
            Connexion
          </Link>
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
              className="flex items-center justify-center text-gray-700 bg-secondaryColor text-gray-700 hover:bg-opacity-90 rounded-md py-2 mt-4"
              to={'/connexion'}
              onClick={toggleMobileMenu}
            >
              <LogIn className="w-[20px] mr-2" /> Connexion
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
