import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState, useMemo } from "react";

// Components
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AmbulanceDriversList from './components/AmbulanceDriversList';
import PrivateRoute from './routes/PrivateRoute';
import MissingForm from "./components/MissingForm";
import MissingList from './components/MissingList';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ServiceUnavailablePage from "./components/ServiceUnavailablePage"; // Import ServiceUnavailablePage

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    }),
    [darkMode]
  );

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent toggleTheme={toggleTheme} darkMode={darkMode} />
      </Router>
    </ThemeProvider>
  );
}

function AppContent({ toggleTheme, darkMode }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/signup"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally show Navbar */}
      {!hideNavbar && <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        
        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/ambulance-drivers" element={<PrivateRoute element={AmbulanceDriversList} />} />
        <Route path="/missing" element={<PrivateRoute element={MissingForm} />} />
        <Route path="/missing-list" element={<PrivateRoute element={MissingList} />} />
        
        {/* Service Unavailable Page Route */}
        <Route path="/service-unavailable" element={<ServiceUnavailablePage />} />
      </Routes>

      {/* Footer visible on all pages */}
      <Footer />
    </>
  );
}

export default App;
