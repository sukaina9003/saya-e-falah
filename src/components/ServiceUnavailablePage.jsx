// ServiceUnavailablePage.jsx
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { VpnKey } from "@mui/icons-material";

function ServiceUnavailablePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <VpnKey sx={{ fontSize: 80, color: "gray", marginBottom: 3 }} />
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Service is currently unavailable
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Sorry for the inconvenience. Please try again later.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
        Go Back to Dashboard
      </Button>
    </Box>
  );
}

export default ServiceUnavailablePage;
