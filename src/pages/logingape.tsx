import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const schema = z
  .object({
    firstName: z.string().min(2, "Минимум 2 символа"),
    
    password: z
      .string()
      .min(8, "Минимум 8 символов")
      .regex(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
      .regex(/[0-9]/, "Должна быть хотя бы одна цифра"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const center = () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
    });

    const stars = Array.from({ length: 360 }, () => {
      const radius = Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.6;
      const angle = Math.random() * Math.PI * 2;

      return {
        radius,
        angle,
        speed: Math.random() * 0.002 + 0.0005,
        r: Math.random() * 1.4 + 0.2,
        twinkleOffset: Math.random() * Math.PI * 2,
      };
    });

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;

      const c = center();

      for (const s of stars) {
        s.angle += s.speed;

        const x = c.x + Math.cos(s.angle) * s.radius;
        const y = c.y + Math.sin(s.angle) * s.radius;

        const a = 0.3 + 0.7 * Math.abs(Math.sin(t + s.twinkleOffset));

        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = () => {
    navigate("/users");
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      fontFamily: "'Sora', sans-serif",
      fontSize: "0.9rem",
      color: "#e2e8f0",
      background: "rgba(255,255,255,0.04)",
      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
      "&:hover fieldset": { borderColor: "rgba(124,58,237,0.5)" },
      "&.Mui-focused fieldset": { borderColor: "#7c3aed", borderWidth: "1.5px" },
      "&.Mui-error fieldset": { borderColor: "#f87171" },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'Sora', sans-serif",
      fontSize: "0.85rem",
      color: "rgba(255,255,255,0.35)",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#a78bfa" },
    "& .MuiInputLabel-root.Mui-error": { color: "#f87171" },
    "& .MuiFormHelperText-root": {
      fontFamily: "'Sora', sans-serif",
      fontSize: "0.72rem",
      color: "#f87171",
      marginLeft: "4px",
    },
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');`}</style>

      <Box
        sx={{
          minHeight: "100vh",
          background: "#0a0910",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Starfield />
        <Header />
        <Footer />

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "440px",
            mx: "auto",
            px: 2,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              p: { xs: 3, sm: 4 },
              backdropFilter: "blur(24px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            }}
          >
            <Box sx={{ mb: 3.5 }}>
              <Typography
                sx={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.55rem",
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  mb: 0.5,
                }}
              >
                Create account
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                 Pepeshnene 
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 3 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <TextField
                  label="First name"
                  fullWidth
                  size="small"
                  sx={inputSx}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  {...register("firstName")}
                />
              
              </Box>

              <TextField
                label="Password"
                fullWidth
                size="small"
                sx={inputSx}
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                        sx={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm password"
                fullWidth
                size="small"
                sx={inputSx}
                type={showConfirm ? "text" : "password"}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                {...register("confirmPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm((v) => !v)}
                        edge="end"
                        sx={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {showConfirm ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                sx={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "12px",
                  py: 1.3,
                  mt: 0.5,
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #6d28d9 0%, #2563eb 100%)",
                    boxShadow: "0 12px 32px rgba(124,58,237,0.45)",
                  },
                }}
              >
                Create account
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}