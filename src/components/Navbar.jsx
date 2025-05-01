import { AppBar, Toolbar, IconButton, Button, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Logo from "../images/saya.jpg";

function Navbar({ toggleTheme, darkMode }) {
  const navigate = useNavigate();

  const navLinks = [
    { title: "Adoption", path: "/adoption" },
    { title: "Ambulance Drivers", path: "/ambulance-drivers" },
    { title: "Missing", path: "/missing" },
    { title: "Reports", path: "/reports" },
    { title: "Dashboard", path: "/dashboard" }, // Adding Dashboard link
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 2, backgroundColor: darkMode ? "#333" : "#FFFFFF", boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          {/* Logo */}
          <Box
            component="img"
            src={Logo}
            alt="Edhi Foundation Logo"
            sx={{
              height: 90,
              cursor: "pointer",
              objectFit: "contain",
            }}
            onClick={() => navigate("/dashboard")}
          />

          {/* Nav Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                sx={{
                  fontWeight: 'bold',
                  color: darkMode ? '#FFF' : '#48A6A7',
                  '&:hover': {
                    backgroundColor: darkMode ? '#444' : '#e0f7f7',
                  },
                }}
                onClick={() => navigate(link.path)}
              >
                {link.title}
              </Button>
            ))}
          </Box>

          {/* Theme Toggle and Logout */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={toggleTheme} sx={{ color: darkMode ? '#FFF' : '#48A6A7' }}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button
              onClick={handleLogout}
              variant="outlined"
              sx={{
                fontWeight: 'bold',
                color: '#FFFFFF',
                borderColor: '#000',
                backgroundColor: '#48A6A7',
                '&:hover': {
                  backgroundColor: '#000',
                  borderColor: '#000',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
