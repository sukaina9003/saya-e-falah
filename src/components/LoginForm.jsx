import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { auth } from "./firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 

const StyledCard = styled(Card)({
  width: 350,
  padding: 20,
  textAlign: "center",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
});

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User logged in successfully");
      navigate("/dashboard"); // Login ke baad Dashboard pe redirect
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh"
      component={motion.div} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
    >
      <StyledCard component={motion.div} whileHover={{ scale: 1.05 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Email" name="email" variant="outlined" onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Password" name="password" type="password" variant="outlined" onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </CardContent>
      </StyledCard>
    </Box>
  );
}

export default LoginForm;
