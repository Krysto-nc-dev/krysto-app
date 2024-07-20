import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProjectDetailsQuery } from '../../slices/projectApiSlice'

import { ArrowBigLeft, PlusCircleIcon } from 'lucide-react'
import Button from '../../components/shared/Button'
import Loader from '../FeedbackScreens/Loader'
import Modal from '../../components/shared/Modal'

const AdminProjectDetailsScreen = () => {
  const { id: projectId } = useParams()

  const {
    data: project,
    error: projectError,
    isLoading: projectLoading,
  } = useGetProjectDetailsQuery(projectId)
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  if (projectLoading) {
    return <Loader />
  }

  if (projectError) {
    return <p className="text-red-500">Erreur: {projectError.message}</p>
  }

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            Détails du Projet
          </h1>
          <Button version={'primary'} url={'/admin-projets'}>
            <ArrowBigLeft /> Retour
          </Button>
        </div>

        <div className="bg-white shadow-md rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            {project.title}
          </h2>
          <p className="text-gray-600 mt-2">{project.description}</p>

          <div className="mt-4">
            <p className="text-gray-600">
              <strong>Catégorie:</strong> {project.category}
            </p>
            <p className="text-gray-600">
              <strong>Type de Projet:</strong> {project.projectType}
            </p>
            <p className="text-gray-600">
              <strong>Budget:</strong> ${project.budget.toLocaleString()}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong> {project.status}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-gray-600">
              <strong>Date de Début:</strong>{' '}
              {new Date(project.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Date de Fin:</strong>{' '}
              {new Date(project.endDate).toLocaleDateString()}
            </p>
          </div>

          {project.documents.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">Documents</h3>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                {project.documents.map((doc, index) => (
                  <li key={index}>
                    <a
                      href={`/uploads/${doc}`}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {doc}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.stages.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Étapes du Projet
                </h3>
                <Button onClick={toggleModal}>
                  {' '}
                  <PlusCircleIcon />
                  Ajouter une étape
                </Button>
              </div>
              <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead>
                  <tr className="bg-primaryColor">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Étape
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Date de Début
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                      Date de Fin
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {project.stages.map((stage) => (
                    <tr key={stage.stageNumber}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stage.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stage.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stage.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(stage.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(stage.endDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal closeModal={toggleModal}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Ajouter un étape</h2>
            <p>TODO = Ajouter une étape pour le projet</p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default AdminProjectDetailsScreen
