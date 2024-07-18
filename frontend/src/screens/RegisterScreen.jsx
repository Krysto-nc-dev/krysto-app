import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'

import { Loader, MoveLeftIcon, MoveRightIcon } from 'lucide-react'
import { BsFacebook, BsGoogle } from 'react-icons/bs'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/admin-dashboard')
      } else if (userInfo.role === 'User') {
        navigate('/')
      } else {
        navigate(redirect)
      }
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    } else {
      try {
        const res = await register({ name, lastname, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate(redirect)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="relative flex flex-col m-1 space-y-10 bg-gray-700 shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* left side  */}
          <div className="p-3 md:p-14 ">
            {/* top content */}
            <h2 className="mb-4 text-4xl font-bold text-gray-200 ">
              Inscription
            </h2>
            <p className="max-w-md mb-8 font-light text-gray-200">
              s'inscrire sur Krysto
            </p>
            <form onSubmit={submitHandler}>
              <input
                type="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-textColor rounded-md placeholder:font-light mb-3 "
                placeholder="Entrez votre Prénom"
              />
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full p-3 border border-textColor rounded-md placeholder:font-light mb-3"
                placeholder="Entrez votre nom"
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-textColor rounded-md placeholder:font-light mb-3"
                placeholder="Entrez votre addresse email"
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-textColor rounded-md placeholder:font-light mb-3 "
                placeholder="Entrez votre mot de passe"
              />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-textColor rounded-md placeholder:font-light "
                placeholder="Confirmez votre mot de passe"
              />
              <button
                type="submit"
                className="w-full mt-6  flex justify-center items-center p-3 space-x-4 font-bold  rounded-md  px-9  bg-primaryColor shadow-gray-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-150"
              >
                {isLoading ? <Loader /> : "S'inscrire"}
              </button>
            </form>
            <div className="flex items-center justify-between mt-6">
              <Link
                // to="/connexion"
                to={redirect ? `/connexion?redirect=${redirect}` : '/connexion'}
                className="text-primaryColor hover:text-secondaryColor"
              >
                Déjà un compte ? Connectez-vous
              </Link>
            </div>

            {/* middle-content */}

            <div className="mt-4 border-b border-b-gray-200"></div>

            <div className="flex flex-col items-center justify-between mt-6 space-y-6 md:flex-row md:space-y-0">
              <Link
                to={'/'}
                className="w-full  flex justify-center items-center p-3 space-x-4 font-bold text-white  rounded-md  px-9  bg-primaryColor shadow-gray-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg  transition hover:-translate-y-0.5 duration-150"
              >
                <MoveRightIcon className="mr-5" />
                Retour au site
              </Link>
            </div>
          </div>

          {/* right side  */}
          <img
            src="/images/BG_bouchons.jpeg"
            className="w-[600px] hidden md:block object-cover rounded-r-2xl"
            alt="Bouchons de bouteilles en plastique"
          />
        </div>
      </div>
    </>
  )
}

export default RegisterScreen
