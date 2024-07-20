import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Loader from '../FeedbackScreens/Loader'
import Button from '../../components/shared/Button'
import { ArrowBigLeft, Loader2, Send } from 'lucide-react'
import { toast } from 'react-toastify'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/userApiSlice'

const AdminWebsiteUserEditScreen = () => {
  const { id: userId } = useParams()

  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
    refetch
  } = useGetUserDetailsQuery(userId)

  console.log(user)

  const [
    updateUser,
    { isLoading: loadingUpdate },
  ] = useUpdateUserMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setLastName(user.lastname || '')
      setIsAdmin(user.isAdmin || false)
      setRole(user.role || '')
      setEmail(user.email || '')
    }
  }, [user])

  const submitHandler = async (e) => {
    e.preventDefault()

    const updatedUser = {
      userId,
      name,
      lastname,
      isAdmin,
      role,
      email,
    }

    try {
      await updateUser(updatedUser).unwrap()
      toast.success('Utilisateur mis à jour avec succès!')
      refetch()
      navigate('/admin/website/utilisateurs')
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', err)
      toast.error('Erreur lors de la mise à jour de l\'utilisateur')
    }
  }

  if (userLoading) {
    return <Loader />
  }

  if (userError) {
    return <p className="text-red-500">Erreur: {userError.message}</p>
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl">Éditer l'utilisateur</h1>
        <Button icon={ArrowBigLeft}>
          <Link to="/admin/website/users"> Retour</Link>
        </Button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Prènom
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
           Nom
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
           Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <span className="ml-2">Administrateur</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rôle
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        
        <Button type="submit" icon={Send}>
          {loadingUpdate ? <Loader2 /> : 'Valider'}
        </Button>
      </form>
    </>
  )
}

export default AdminWebsiteUserEditScreen
