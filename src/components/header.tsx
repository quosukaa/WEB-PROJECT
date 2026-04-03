import { Box, Typography, Button } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isWalletAgent = location.pathname === "/scampage";

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        px: 4,
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(15, 14, 23, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
        <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <DiamondIcon sx={{ color: "#fff", fontSize: 18 }} />
        </Box>
        <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#fff", letterSpacing: "-0.02em" }}>
          PepeShnene
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {isWalletAgent && (
          <Button
            onClick={() => navigate("/users")}
            startIcon={<PeopleAlt sx={{ fontSize: "0.9rem !important" }} />}
            sx={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
              textTransform: "none",
              borderRadius: "10px",
              py: 0.7,
              px: 1.8,
              color: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.2s",
              "&:hover": {
                color: "#a78bfa",
                borderColor: "rgba(124,58,237,0.5)",
                background: "rgba(124,58,237,0.08)",
              },
            }}
          >
            Users
          </Button>
        )}
      </Box>
    </Box>
  );
}