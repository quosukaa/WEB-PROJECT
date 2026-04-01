import { Box, Typography } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";

export default function Header() {
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
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DiamondIcon sx={{ color: "#fff", fontSize: 18 }} />
        </Box>
        <Typography
          sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          PepeShnene
        </Typography>
      </Box>

      {/* Nav links */}
      <Box sx={{ display: "flex", gap: 3.5 }}>
        {[].map((item) => (
          <Typography
            key={item}
            sx={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.45)",
              cursor: "pointer",
              transition: "color 0.2s",
              "&:hover": { color: "#a78bfa" },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}