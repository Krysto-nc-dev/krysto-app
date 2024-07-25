import React, { useState, useMemo } from 'react';
import { useGetEmailsQuery, useAddEmailMutation, useDeleteEmailMutation } from '../../slices/emailApiSlice';
import Loader from '../../components/shared/Loader';
import Modal from '../../components/shared/Modal';
import { CheckCircle, XCircle, Edit, Trash, PlusCircle as PlusCircleIcon } from 'lucide-react'; // Import des icônes
import { toast } from 'react-toastify';
import Button from '../../components/shared/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AdminBanksScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    civility: '',
    firstname: '',
    lastname: '',
    city: '',
    birthdate: '',
    acceptMailing: true, // Default value based on schema
  });

  const [addEmail] = useAddEmailMutation();
  const [deleteEmail] = useDeleteEmailMutation(); // Utilisation de useDeleteEmailMutation

  const { data: emails, error: errorMail, isLoading: emailLoading, refetch: refetchEmails } = useGetEmailsQuery();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmails = useMemo(() => {
    return emails?.filter(email =>
      Object.values(email).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) || [];
  }, [emails, searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmail(formData);
      toggleModal(); // Close modal on successful submission
      refetchEmails(); // Refetch emails to update the list
      // Optionally clear form data after successful submission
      setFormData({
        email: '',
        civility: '',
        firstname: '',
        lastname: '',
        city: '',
        birthdate: '',
        acceptMailing: true, // Reset to default
      });
    } catch (error) {
      console.error('Error adding email:', error);
      // Handle error state if needed
    }
  };

  const handleEdit = (emailId) => {
    // Logic to handle editing an email, if needed
    console.log(`Edit email with ID: ${emailId}`);
  };

  const handleDelete = async (emailId) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet email ?')) {
      try {
        await deleteEmail(emailId); // Utilisation de la mutation pour supprimer l'email
        toast.success("Email supprimé avec succès.");
        refetchEmails(); // Rafraîchir la liste des emails après la suppression
      } catch (error) {
        console.error('Error deleting email:', error);
        toast.error("Une erreur est survenue lors de la suppression de l'email.");
        // Handle error state if needed
      }
    }
  };

  if (emailLoading) {
    return <Loader />;
  }

  if (errorMail) {
    return <p className="text-red-500">{errorMail.message}</p>;
  }

  return (
    <>
      {showModal && (
        <Modal closeModal={toggleModal}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Ajouter un email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </div>
                <div className="w-1/2">
                  <TextField
                    label="Civilité"
                    name="civility"
                    type="text"
                    value={formData.civility}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <TextField
                    label="Prénom"
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="w-1/2">
                  <TextField
                    label="Nom"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <TextField
                    label="Ville"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </div>
                <div className="w-1/2">
                  <TextField
                    label="Date de naissance"
                    name="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
              <div>
                <TextField
                  id="acceptMailing"
                  name="acceptMailing"
                  type="checkbox"
                  label="Accepte les mails"
                  checked={formData.acceptMailing}
                  onChange={(e) => setFormData((prev) => ({ ...prev, acceptMailing: e.target.checked }))}
                />
                <label htmlFor="acceptMailing" className="ml-2 block text-sm text-gray-900">
                  Accepte de recevoir des mails
                </label>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="py-2 px-4 bg-primaryColor text-white rounded"
                >
                  Ajouter
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      <div className="p-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Liste des emails</h2>
          <Button icon={PlusCircleIcon} onClick={toggleModal} />
        </div>
{/* 
        <TextField
          placeholder="Rechercher..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleChangeSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}

        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Civilité</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Ville</TableCell>
                <TableCell>Date de naissance</TableCell>
                <TableCell>Accepte les mails</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((email) => (
                <TableRow key={email._id}>
                  <TableCell>{email.email}</TableCell>
                  <TableCell>{email.civility}</TableCell>
                  <TableCell>{email.firstname}</TableCell>
                  <TableCell>{email.lastname}</TableCell>
                  <TableCell>{email.city}</TableCell>
                  <TableCell>
                    {email.birthdate ? new Date(email.birthdate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {email.acceptMailing ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : (
                      <XCircle className="text-red-500" size={24} />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(email._id)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(email._id)} color="error">
                      <Trash />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEmails.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
};

export default AdminBanksScreen;
