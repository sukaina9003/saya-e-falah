import { useState, useEffect } from 'react';
import { addDoc, doc, updateDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';

const AmbulanceDriverForm = ({ driverToEdit, onSuccess, onCancel }) => {
  const [driver, setDriver] = useState({
    firstName: '',
    lastName: '',
    cnic: '',
    city: '',
    phone: '',
    licenseNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (driverToEdit) {
      setDriver(driverToEdit); // Populate form fields when editing
    }
  }, [driverToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!driver.firstName.trim()) return 'First name is required';
    if (!driver.lastName.trim()) return 'Last name is required';
    if (!driver.cnic.match(/^\d{5}-\d{7}-\d{1}$/)) return 'CNIC must be in format 12345-1234567-1';
    if (!driver.phone.match(/^\d{11}$/)) return 'Phone must be 11 digits';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (driverToEdit) {
        // Update existing driver
        await updateDoc(doc(db, 'ambulanceDrivers', driverToEdit.id), driver);
      } else {
        // Add new driver
        await addDoc(collection(db, 'ambulanceDrivers'), {
          ...driver,
          createdAt: new Date()
        });
      }
      onSuccess();
    } catch (err) {
      setError('Failed to save driver: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem' }}>
          {driverToEdit ? 'Update Driver' : 'Add New Driver'}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2, fontSize: '1.1rem' }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={driver.firstName}
                onChange={handleChange}
                required
                InputProps={{ sx: { fontSize: '1.1rem' } }}
                InputLabelProps={{ sx: { fontSize: '1.1rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={driver.lastName}
                onChange={handleChange}
                required
                InputProps={{ sx: { fontSize: '1.1rem' } }}
                InputLabelProps={{ sx: { fontSize: '1.1rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CNIC (Format: 12345-1234567-1)"
                name="cnic"
                value={driver.cnic}
                onChange={handleChange}
                required
                InputProps={{ sx: { fontSize: '1.1rem' } }}
                InputLabelProps={{ sx: { fontSize: '1.1rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={driver.city}
                onChange={handleChange}
                required
                InputProps={{ sx: { fontSize: '1.1rem' } }}
                InputLabelProps={{ sx: { fontSize: '1.1rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number (11 digits)"
                name="phone"
                value={driver.phone}
                onChange={handleChange}
                required
                InputProps={{ sx: { fontSize: '1.1rem' } }}
                InputLabelProps={{ sx: { fontSize: '1.1rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="License Number"
                name="licenseNumber"
                value={driver.licenseNumber}
                onChange={handleChange}
                required
                InputProps={{ sx: { fontSize: '1.1rem' } }}
                InputLabelProps={{ sx: { fontSize: '1.1rem' } }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={onCancel}
              disabled={loading}
              sx={{ fontSize: '1rem', px: 3, py: 1 }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{ fontSize: '1rem', px: 4, py: 1.2 }}
            >
              {driverToEdit ? 'Update' : 'Save'} Driver
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default AmbulanceDriverForm;
