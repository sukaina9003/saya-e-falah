import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  TextField
} from '@mui/material';
import { Edit, Delete, Add } from "@mui/icons-material";
import AmbulanceDriverForm from './AmbulanceDriverForm';

const AmbulanceDriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'ambulanceDrivers'));
      const driversData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDrivers(driversData);
    } catch (err) {
      setError('Failed to fetch drivers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDriver = () => {
    setCurrentDriver(null);
    setOpenForm(true);
  };

  const handleEditDriver = (driver) => {
    setCurrentDriver(driver);
    setOpenForm(true);
  };

  const handleDelete = async (driverId) => {
    try {
      await deleteDoc(doc(db, 'ambulanceDrivers', driverId));
      fetchDrivers();
    } catch (err) {
      setError('Failed to delete driver: ' + err.message);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleFormSuccess = () => {
    setOpenForm(false);
    fetchDrivers();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDrivers = drivers.filter((driver) => {
    const fullName = `${driver.firstName} ${driver.lastName}`.toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();
    return (
      fullName.includes(searchQueryLower) ||
      driver.cnic.includes(searchQueryLower) ||
      driver.city.toLowerCase().includes(searchQueryLower) ||
      driver.phone.includes(searchQueryLower) ||
      driver.licenseNumber.includes(searchQueryLower)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Heading Box with Navbar style */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1976d2',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: 2,
        marginBottom: 3,
      }}>
        <Typography variant="h4" sx={{ color: 'white', fontSize: '2rem' }}>
          Ambulance Driver Management
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2, fontSize: '1rem' }}>{error}</Alert>}

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleAddDriver}
          startIcon={<Add />}
          sx={{ fontSize: '1rem', padding: '8px 16px' }}
        >
          Add New Driver
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search Drivers"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{ sx: { fontSize: '1rem' } }}
          InputLabelProps={{ sx: { fontSize: '1rem' } }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '1rem' }}>Name</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }}>CNIC</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }}>City</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }}>Phone</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }}>License</TableCell>
                    <TableCell sx={{ fontSize: '1rem' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell sx={{ fontSize: '1rem' }}>
                        {driver.firstName} {driver.lastName}
                      </TableCell>
                      <TableCell sx={{ fontSize: '1rem' }}>{driver.cnic}</TableCell>
                      <TableCell sx={{ fontSize: '1rem' }}>{driver.city}</TableCell>
                      <TableCell sx={{ fontSize: '1rem' }}>{driver.phone}</TableCell>
                      <TableCell sx={{ fontSize: '1rem' }}>{driver.licenseNumber}</TableCell>
                      <TableCell sx={{ fontSize: '1rem' }}>
                        <IconButton onClick={() => handleEditDriver(driver)}>
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => setDeleteConfirm(driver.id)}>
                          <Delete color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontSize: '1.5rem' }}>
          {currentDriver ? 'Update Driver' : 'Add New Driver'}
        </DialogTitle>
        <DialogContent sx={{ fontSize: '1rem' }}>
          <AmbulanceDriverForm
            driverToEdit={currentDriver}
            onSuccess={handleFormSuccess}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle sx={{ fontSize: '1.4rem' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: '1.1rem' }}>
            Are you sure you want to delete this driver?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)} sx={{ fontSize: '1rem' }}>Cancel</Button>
          <Button
            onClick={() => handleDelete(deleteConfirm)}
            color="error"
            variant="contained"
            sx={{ fontSize: '1rem' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AmbulanceDriversList;
