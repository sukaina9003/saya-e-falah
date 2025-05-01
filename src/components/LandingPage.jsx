import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import sayaImage from "../images/saya.jpg";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #d9e4f5, #fdfbfb)",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: "100%",
          p: 3,
          borderRadius: 4,
          boxShadow: 6,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Box
          component="img"
          src={sayaImage}
          alt="Saya-e-Falah"
          sx={{
            width: 180,
            height: 180,
            objectFit: "cover",
            borderRadius: "50%", // makes it fully round
            mb: 2,
            mx: "auto",
            boxShadow: 3,
          }}
        />
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Saya-e-Falah
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
            A unified platform for community help, adoption services, missing person reports, and emergency assistance.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/signup")}
            sx={{
              px: 4,
              py: 1,
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              borderRadius: 2,
            }}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LandingPage;
