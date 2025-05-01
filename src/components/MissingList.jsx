import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

function MissingList() {
  const [missingList, setMissingList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMissingPersons = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'missingPersons'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMissingList(data);
    } catch (err) {
      console.error("Error fetching missing persons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissingPersons();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>Missing Persons</Typography>
      <Grid container spacing={3}>
        {missingList.map(person => (
          <Grid item xs={12} sm={6} md={4} key={person.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={person.imageUrl}
                alt={person.name}
              />
              <CardContent>
                <Typography variant="h6">{person.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Last Seen:</strong> {person.location}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {person.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MissingList;
