import React, { useState, useMemo } from 'react';
import { useGetEmailsQuery, useAddEmailMutation, useDeleteEmailMutation } from '../../slices/emailApiSlice';
import { CircularProgress, Typography, Box, Button, IconButton, Select, MenuItem, InputLabel, FormControl, TextField, Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, InputAdornment } from '@mui/material';
import { PlusCircle, CheckCircle, XCircle, Edit, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import Modal from '../../components/shared/Modal';
import AnimatedPageTitle from './../../components/shared/AnimatedPageTitle';
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
  const [deleteEmail] = useDeleteEmailMutation();

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
        await deleteEmail(emailId);
        toast.success("Email supprimé avec succès.");
        refetchEmails();
      } catch (error) {
        console.error('Error deleting email:', error);
        toast.error("Une erreur est survenue lors de la suppression de l'email.");
      }
    }
  };

  if (emailLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorMail) {
    return <Typography color="error">Erreur : {errorMail.message}</Typography>;
  }

  return (
    <>
      {showModal && (
        <Modal closeModal={toggleModal}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Ajouter un email</Typography>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Civilité"
                  name="civility"
                  type="text"
                  value={formData.civility}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Prénom"
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Nom"
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Ville"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Date de naissance"
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <input
                  id="acceptMailing"
                  name="acceptMailing"
                  type="checkbox"
                  checked={formData.acceptMailing}
                  onChange={(e) => setFormData((prev) => ({ ...prev, acceptMailing: e.target.checked }))}
                />
                <InputLabel htmlFor="acceptMailing">Accepte de recevoir des mails</InputLabel>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" color="primary">
                  Ajouter
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      )}

      <Box sx={{ p: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <AnimatedPageTitle title={`Liste des emails (${filteredEmails.length})`} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Rechercher..."
              variant="outlined"
              value={searchTerm}
              onChange={handleChangeSearch}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlusCircle size={20} />}
              onClick={toggleModal}
            >
              Nouveau email
            </Button>
          </Box>
        </Box>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
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
                        <CheckCircle className="text-green-500" size={16} />
                      ) : (
                        <XCircle className="text-red-500" size={16} />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(email._id)} color="primary" size="small">
                        <Edit size={16} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(email._id)} color="error" size="small">
                        <Trash size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredEmails.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default AdminBanksScreen;
