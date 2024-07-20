import React from 'react'
import { useGetProjectsQuery } from '../../slices/projectApiSlice'
import { Link } from 'react-router-dom'
import Button from '../../components/shared/Button'
import { Edit, EyeIcon } from 'lucide-react'

const AdminProjectsScreen = () => {
  const { data: projects, error: errorProjects, isLoading: projectsLoading } = useGetProjectsQuery()

  if (projectsLoading) {
    return <p>Chargement des projets...</p>
  }

  if (errorProjects) {
    return <p className='text-red-500'>Erreur: {errorProjects.message}</p>
  }

  return (
    <div className='text-gray-800'>
      <h1 className='text-2xl mb-4'>Projets</h1>
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
                
                <Button url={`/admin/project-details/${project._id}`} version={"primary"} icon={EyeIcon}/>
                <Button url={`/admin/project/edit/${project._id}`} version={"warning"} icon={Edit}/>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminProjectsScreen
