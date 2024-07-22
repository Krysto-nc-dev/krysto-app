import React from 'react'
import { useParams } from 'react-router-dom'

const AdminPresentationEditScreen = () => {
    const { id: presentationId } = useParams()
  return (
    <div>AdminPresentationEditScreen</div>
  )
}

export default AdminPresentationEditScreen