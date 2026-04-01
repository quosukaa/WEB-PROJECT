import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        px: 4,
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(15, 14, 23, 0.85)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        © 2025 PepeShnene 
      </Typography>

      <Box sx={{ display: "flex", gap: 3 }}>
        {[].map((link) => (
          <Typography
            key={link}
            sx={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)",
              cursor: "pointer",
              "&:hover": { color: "#a78bfa" },
              transition: "color 0.2s",
            }}
          >
            {link}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}