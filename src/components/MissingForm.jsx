import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  CircularProgress, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function MissingForm() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image.");

    setLoading(true);

    try {
      const storage = getStorage();
      const imageRef = ref(storage, `missing_images/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "missingPersons"), {
        name,
        location,
        description,
        imageUrl,
        createdAt: new Date()
      });

      alert("Missing person submitted successfully.");
      setName('');
      setLocation('');
      setDescription('');
      setImage(null);
      e.target.reset();

    } catch (err) {
      console.error("Error uploading data:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2, position: 'relative' }}>
      {/* Navigation Icon */}
      <Tooltip title="View Missing List">
        <IconButton 
          onClick={() => navigate('/missing-list')}
          sx={{ position: 'absolute', top: 16, right: 16 }}
          color="primary"
        >
          <ListAltIcon />
        </IconButton>
      </Tooltip>

      <Typography variant="h5" gutterBottom>Submit Missing Person</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" required 
        />
        <TextField 
          fullWidth label="Last Seen Location" value={location} onChange={(e) => setLocation(e.target.value)} margin="normal" required 
        />
        <TextField 
          fullWidth multiline rows={3} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ margin: '16px 0' }} required />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Box>
  );
}

export default MissingForm;
