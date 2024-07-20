import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetProjectDetailsQuery, useUpdateProjectMutation, useAddProjectStageMutation, useUpdateProjectStageMutation, useUploadProjectDocumentsMutation } from '../../slices/projectApiSlice';
import { ArrowBigLeft, PlusCircleIcon, Send } from 'lucide-react';
import Button from '../../components/shared/Button';
import Loader from '../FeedbackScreens/Loader';
import { toast } from 'react-toastify';

const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const AdminProjectDetailsScreen = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [projectType, setProjectType] = useState('');
    const [budget, setBudget] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [stages, setStages] = useState([]);
    const [documentsArray, setDocumentsArray] = useState([]);

    const { data: project, error: projectError, isLoading: projectLoading, refetch } = useGetProjectDetailsQuery(projectId);
    const [updateProject, { isLoading: loadingUpdate }] = useUpdateProjectMutation();
    const [addProjectStage] = useAddProjectStageMutation();
    const [updateProjectStage] = useUpdateProjectStageMutation();
    const [uploadProjectDocument, { isLoading: uploadMutationLoading }] = useUploadProjectDocumentsMutation();

    useEffect(() => {
        if (project) {
            setTitle(project.title || '');
            setDescription(project.description || '');
            setCategory(project.category || '');
            setProjectType(project.projectType || '');
            setBudget(project.budget || '');
            setStartDate(project.startDate ? formatDateForInput(project.startDate) : '');
            setEndDate(project.endDate ? formatDateForInput(project.endDate) : '');
            setStatus(project.status || '');
            setStages(project.stages || []);
            setDocumentsArray(project?.documents || []);
        }
    }, [project]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProject = {
            _id: projectId,
            title,
            description,
            category,
            projectType,
            budget,
            documents: documentsArray,
            startDate, // Assurez-vous que c'est au format YYYY-MM-DD
            endDate,   // Assurez-vous que c'est au format YYYY-MM-DD
            status,
            stages
        };

        try {
            await updateProject(updatedProject).unwrap();
            toast.success('Projet mis à jour avec succès!');
            refetch();
            navigate(`/admin-projet-details/${projectId}`);
        } catch (err) {
            console.error("Erreur lors de la mise à jour du projet:", err);
            toast.error("Erreur lors de la mise à jour du projet");
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('documents', e.target.files[0]);

        try {
            const res = await uploadProjectDocument(formData).unwrap();
            setDocumentsArray((prevDocuments) => [...prevDocuments, ...res.documents]);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const removeDocument = (index) => {
        const newDocumentsArray = [...documentsArray];
        newDocumentsArray.splice(index, 1);
        setDocumentsArray(newDocumentsArray);
    };

    const addStageHandler = async (e) => {
        e.preventDefault();
        const stage = {
            title: '', // You need to manage these fields as well
            description: '',
            startDate: '',
            endDate: '',
            status: 'Non commencée'
        };

        try {
            const updatedStages = [...stages, stage];
            await addProjectStage({ projectId, stages: updatedStages }).unwrap();
            toast.success('Étape ajoutée avec succès!');
            refetch();
        } catch (err) {
            console.error("Erreur lors de l'ajout de l'étape:", err);
            toast.error("Erreur lors de l'ajout de l'étape");
        }
    };

    if (projectLoading) {
        return <Loader />;
    }

    if (projectError) {
        return <p className='text-red-500'>Erreur: {projectError.message}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-10 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Modifier le Projet</h1>
                <Button version={"primary"} url={'/admin-projets'}>
                    <ArrowBigLeft /> Retour
                </Button>
            </div>

            <form onSubmit={submitHandler} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Titre du Projet</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        rows="4"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Catégorie</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Type de Projet</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Budget</label>
                    <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date de Début</label>
                    <input
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date de Fin</label>
                    <input
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Statut</label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Proposition">Proposition</option>
                        <option value="Approuvé">Approuvé</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                        <option value="Abandonné">Abandonné</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Documents</label>
                    <div className="flex flex-wrap">
                        {documentsArray.length > 0 ? (
                            documentsArray.map((document, index) => (
                                <div key={index} className="relative mr-4 mb-4">
                                    <p>{document}</p>
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                                        onClick={() => removeDocument(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>Aucun Document ajouté</p>
                        )}
                    </div>
                    <input
                        type="file"
                        multiple
                        onChange={uploadFileHandler}
                    />
                </div>
                <Button type="submit" icon={Send}>
                    {loadingUpdate ? <Loader /> : 'Sauvegarder'}
                </Button>
            </form>
        </div>
    );
};

export default AdminProjectDetailsScreen;
