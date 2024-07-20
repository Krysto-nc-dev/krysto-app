import React from 'react'
import { useCreateProjectMutation, useDeleteProjectMutation, useGetProjectsQuery } from '../../slices/projectApiSlice'
import Button from '../../components/shared/Button'
import { Edit, EyeIcon, Loader2, PlusCircle, Trash } from 'lucide-react'
import Loader from '../FeedbackScreens/Loader'
import { toast } from 'react-toastify'

const AdminProjectsScreen = () => {
  const { data: projects, error: errorProjects, isLoading: projectsLoading, refetch } = useGetProjectsQuery()

  const [
    createProject,
    { isLoading: loadingCreate },
  ] = useCreateProjectMutation()

  const [
    deleteProject,
    { isLoading: deleteProjectLoading },
  ] = useDeleteProjectMutation()

  
  const createProjectHandler = async () => {
    if (window.confirm('Voulez-vous créer un projet ?')) {
      try {
        await createProject()
        refetch()
        toast.success('Type de plastique créé avec succès')
      } catch (err) {
        toast.error('Erreur lors de la création du type de plastique')
      }
    }
  }

  const deleteHandler = async (id) => {
    if (window.confirm('Etes-vous sur de vouloir supprimer ce projet ?')) {
      try {
        await deleteProject(id).unwrap()
        toast.success('projet supprimé avec succès!')
        refetch()
      } catch (err) {
        toast.error('Erreur lors de la suppression du projet')
      }
    }
  }

  if (deleteProjectLoading) return <Loader />


  if (projectsLoading) {
    return <Loader/>
  }

  if (errorProjects) {
    return <p className='text-red-500'>Erreur: {errorProjects.message}</p>
  }

  return (
    <div className='text-gray-800'>
      <div className="flex items-center justify-between mb-6">

      <h1 className='text-2xl'>Projets</h1>
      <Button
        onClick={createProjectHandler}
        icon={PlusCircle}
        version="success"
        >
        {loadingCreate ? <Loader2 /> : 'Ajouter'}
      </Button>
          </div>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr className='bg-primaryColor'>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'>Titre</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'>Catégorie</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'>Type de Projet</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'>Date de Début</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'>Date de Fin</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {projects.map((project) => (
            <tr key={project._id}>
              <td className='px-6 py-4 whitespace-nowrap'>{project.title}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{project.category}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{project.projectType}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{new Date(project.startDate).toLocaleDateString()}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{new Date(project.endDate).toLocaleDateString()}</td>
              <td className='px-6 py-4 whitespace-nowrap flex gap-2 items-center'>
                
                <Button url={`/admin-projet-details/${project._id}`} version={"primary"} icon={EyeIcon}/>
                <Button url={`/admin-projet/edit/${project._id}`} version={"warning"} icon={Edit}/>
                <Button onClick={() => deleteHandler(project._id)} version={"danger"} icon={Trash}/>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminProjectsScreen
