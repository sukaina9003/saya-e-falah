import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, Link } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const StyledCard = styled(Card)({
  width: 400,
  padding: 20,
  textAlign: "center",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
});

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    city: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Save additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        lastName: formData.lastName,
        city: formData.city,
        email: formData.email,
        createdAt: new Date(),
      });
      console.log("Navigating to dashboard...");
      navigate("/dashboard");
      // Navigate to dashboard after successful signup
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      component={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledCard component={motion.div} whileHover={{ scale: 1.05 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="lastName"
              variant="outlined"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="City"
              name="city"
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
              inputProps={{ minLength: 6 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </form>

          <Box mt={2}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/login" variant="body2" color="primary">
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
}

export default SignupForm;
