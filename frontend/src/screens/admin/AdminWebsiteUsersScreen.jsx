import React from 'react'
import { useDeleteUsersMutation, useGetUsersQuery, useUpdateUserMutation } from '../../slices/userApiSlice'
import Loader from '../FeedbackScreens/Loader'
import Button from '../../components/shared/Button'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowBigLeft, CheckCheck, Edit, Trash , X } from 'lucide-react'

const AdminWebsiteUsersScreen = () => {
  const { data: users, error: errorUsers, isLoading: loadingUsers , refetch} = useGetUsersQuery()
  const [updateUser] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUsersMutation()

  const handleUpdate = (user) => {
    // Ajoutez la logique pour mettre à jour l'utilisateur ici.
    // Vous pouvez rediriger vers une page de mise à jour ou afficher un formulaire de mise à jour dans le même composant.
    toast.info('Fonction de mise à jour non implémentée')
  }

  const handleDelete = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await deleteUser(userId).unwrap()
        refetch()
        toast.success('Utilisateur supprimé avec succès!')
      } catch (err) {
        toast.error('Erreur lors de la suppression de l\'utilisateur')
      }
    }
  }

  if (loadingUsers) return <Loader />
  if (errorUsers) return <p className="text-red-500">Erreur: {errorUsers.message}</p>

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl">Liste des utilisateurs</h1>
        <Button icon={ArrowBigLeft}>
          <Link to="/admin-dashboard"> Retour</Link>
        </Button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primaryColor">
          <tr>
            <th className="px-6 py-3 text-left text-xs  text-gray-700 font-bold uppercase tracking-wider">Nom</th>
            <th className="px-6 py-3 text-left text-xs  text-gray-700 font-bold uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs  text-gray-700 font-bold uppercase tracking-wider">Rôle</th>
            <th className="px-6 py-3 text-left text-xs  text-gray-700 font-bold uppercase tracking-wider">Admin</th>
            <th className="px-6 py-3 text-left text-xs  text-gray-700 font-bold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name} {user.lastname}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.isAdmin ? (<CheckCheck className='text-green-600' />) : (<X className='text-red-500'/> )}</td>
              <td className=" flex justify-center items-center gap-3 px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button version={'warning'} icon={Edit} onClick={() => handleUpdate(user)} className="mr-2"></Button>
                <Button version={'danger'} icon={Trash} onClick={() => handleDelete(user._id)} className="bg-red-500 text-white"></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminWebsiteUsersScreen
