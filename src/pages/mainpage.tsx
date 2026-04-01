import { useState } from "react";
import { useEffect, useRef } from "react";
import {
  Box,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Settings,
  Search,
  ContentCopy,
  ChevronLeft,
  ChevronRight,
  PeopleAlt,
} from "@mui/icons-material";
import Header from "../components/header";
import Footer from "../components/footer";

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

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.004 + 0.001,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      for (const s of stars) {
        const a =
          0.3 + 0.65 * Math.abs(Math.sin(t * s.speed * 60 + s.twinkleOffset));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
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

interface User {
  id: string;
  firstName: string;
  lastName: string;
  token: string;
  joined: string;
  avatarColor: string;
}

const ALL_USERS: User[] = [
  { id: "USR-001", firstName: "Alexei",    lastName: "Volkov",     token: "tok_ax9f2k1mz0qw", joined: "12 Jan 2025", avatarColor: "#7c3aed" },
  { id: "USR-002", firstName: "Maria",     lastName: "Ivanova",    token: "tok_bv3g7n4py1re", joined: "03 Feb 2025", avatarColor: "#3b82f6" },
  { id: "USR-003", firstName: "Dmitri",    lastName: "Sokolov",    token: "tok_cw8h5o2qz6sf", joined: "21 Feb 2025", avatarColor: "#6366f1" },
  { id: "USR-004", firstName: "Olga",      lastName: "Petrova",    token: "tok_dx1i9p3ra7tg", joined: "05 Mar 2025", avatarColor: "#8b5cf6" },
  { id: "USR-005", firstName: "Ivan",      lastName: "Sidorov",    token: "tok_ey4j0q8sb2uh", joined: "18 Mar 2025", avatarColor: "#2563eb" },
  { id: "USR-006", firstName: "Natalia",   lastName: "Kozlova",    token: "tok_fz7k1r9tc3vi", joined: "02 Apr 2025", avatarColor: "#7c3aed" },
  { id: "USR-007", firstName: "Sergei",    lastName: "Novikov",    token: "tok_ga2l5s0ud4wj", joined: "14 Apr 2025", avatarColor: "#4f46e5" },
  { id: "USR-008", firstName: "Elena",     lastName: "Morozova",   token: "tok_hb3m6t1ve5xk", joined: "29 Apr 2025", avatarColor: "#3b82f6" },
  { id: "USR-009", firstName: "Pavel",     lastName: "Fedorov",    token: "tok_ic4n7u2wf6yl", joined: "07 May 2025", avatarColor: "#6d28d9" },
  { id: "USR-010", firstName: "Anastasia", lastName: "Mikhailova", token: "tok_jd5o8v3xg7zm", joined: "22 May 2025", avatarColor: "#1d4ed8" },
  { id: "USR-011", firstName: "Kirill",    lastName: "Andreev",    token: "tok_ke6p9w4yh8an", joined: "01 Jun 2025", avatarColor: "#7c3aed" },
  { id: "USR-012", firstName: "Yuliya",    lastName: "Popova",     token: "tok_lf7q0x5zi9bo", joined: "15 Jun 2025", avatarColor: "#3b82f6" },
];

const PAGE_SIZE = 5;

function CopyText({ text, display }: { text: string; display: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Tooltip title={copied ? "Copied!" : "Copy"} placement="top">
      <Box
        onClick={copy}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          cursor: "pointer",
          color: copied ? "#a78bfa" : "rgba(255,255,255,0.3)",
          transition: "color 0.2s",
          "&:hover": { color: "#a78bfa" },
        }}
      >
        <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.7rem", letterSpacing: "0.03em" }}>
          {display}
        </Typography>
        <ContentCopy sx={{ fontSize: "0.65rem" }} />
      </Box>
    </Tooltip>
  );
}

const glassSx = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  backdropFilter: "blur(24px)",
  boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
};

const modalSx = {
  "& .MuiDialog-paper": {
    background: "#0f0d1a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    backdropFilter: "blur(24px)",
    boxShadow: "0 24px 64px rgba(0,0,0,0.8)",
    p: 3,
    minWidth: 360,
  },
};

const modalInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    fontFamily: "'Sora', sans-serif",
    fontSize: "0.85rem",
    color: "#e2e8f0",
    background: "rgba(255,255,255,0.04)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(124,58,237,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#7c3aed", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Sora', sans-serif",
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.3)",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#a78bfa" },
};

const saveBtnSx = {
  fontFamily: "'Sora', sans-serif",
  fontWeight: 600,
  fontSize: "0.85rem",
  textTransform: "none",
  borderRadius: "12px",
  py: 1.1,
  background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
  color: "#fff",
  boxShadow: "0 8px 24px rgba(124,58,237,0.3)",
  "&:hover": { background: "linear-gradient(135deg, #6d28d9 0%, #2563eb 100%)" },
};

const cancelBtnSx = {
  fontFamily: "'Sora', sans-serif",
  fontWeight: 500,
  fontSize: "0.85rem",
  textTransform: "none",
  borderRadius: "12px",
  py: 1.1,
  border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.4)",
  "&:hover": { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" },
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    fontFamily: "'Sora', sans-serif",
    fontSize: "0.85rem",
    color: "#e2e8f0",
    background: "rgba(255,255,255,0.04)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(124,58,237,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#7c3aed", borderWidth: "1.5px" },
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.25)", opacity: 1 },
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [apiKey, setApiKey] = useState("sk-ppsh-••••••••••••4f2a");
  const [leadForm, setLeadForm] = useState({ name: "", token: "", order: "" });

  const filtered = ALL_USERS.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.token.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLeadSave = () => {
    setLeadForm({ name: "", token: "", order: "" });
    setAddLeadOpen(false);
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');`}</style>

      <Box sx={{ minHeight: "100vh", background: "#0a0910", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden", py: 12 }}>
        <Starfield />
        <Header />
        <Footer />

        <Box sx={{ position: "fixed", top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

        <Box sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "860px", mx: "auto", px: 2, display: "flex", flexDirection: "column", gap: 2.5 }}>

          {/* TOP BLOCK */}
          <Box sx={{ ...glassSx, p: { xs: 2.5, sm: 3 }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(124,58,237,0.35)", flexShrink: 0 }}>
                <PeopleAlt sx={{ color: "#fff", fontSize: "1.2rem" }} />
              </Box>
              <Box>
                <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  Users
                </Typography>
                <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", mt: 0.3 }}>
                  API key:{" "}
                  <Box component="span" sx={{ color: "#a78bfa", letterSpacing: "0.06em", fontWeight: 500 }}>{apiKey}</Box>
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ px: 2, py: 0.6, borderRadius: "10px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}>
                <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", color: "#a78bfa", fontWeight: 600 }}>
                  {ALL_USERS.length} total
                </Typography>
              </Box>

              <Button onClick={() => setAddLeadOpen(true)} sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.78rem", textTransform: "none", borderRadius: "10px", py: 0.7, px: 1.8, background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)", color: "#fff", boxShadow: "0 6px 18px rgba(124,58,237,0.3)", "&:hover": { background: "linear-gradient(135deg, #6d28d9 0%, #2563eb 100%)" } }}>
                + Add Lead
              </Button>

              <Tooltip title="Settings" placement="top">
                <IconButton onClick={() => setSettingsOpen(true)} sx={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "rgba(255,255,255,0.5)", width: 40, height: 40, transition: "all 0.2s", "&:hover": { borderColor: "rgba(124,58,237,0.5)", color: "#a78bfa", background: "rgba(124,58,237,0.08)" } }}>
                  <Settings fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* BOTTOM BLOCK */}
          <Box sx={{ ...glassSx, overflow: "hidden" }}>
            <Box sx={{ p: { xs: 2.5, sm: 3 }, pb: 2 }}>
              <TextField fullWidth size="small" placeholder="Search by name, token or ID…" value={search} onChange={handleSearch} sx={inputSx}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: "rgba(255,255,255,0.25)", fontSize: "1rem" }} /></InputAdornment> }}
              />
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            <Box sx={{ display: "grid", gridTemplateColumns: "2fr 2fr", px: { xs: 2.5, sm: 3 }, py: 1.2, background: "rgba(255,255,255,0.025)" }}>
              {["User", "Token / ID"].map((h) => (
                <Typography key={h} sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.67rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {h}
                </Typography>
              ))}
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            {paginated.length === 0 ? (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Sora', sans-serif", color: "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>No users found</Typography>
              </Box>
            ) : (
              paginated.map((user, i) => (
                <Box key={user.id}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "2fr 2fr", alignItems: "center", px: { xs: 2.5, sm: 3 }, py: 1.6, transition: "background 0.15s", "&:hover": { background: "rgba(124,58,237,0.05)" } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ width: 34, height: 34, fontSize: "0.75rem", fontFamily: "'Sora', sans-serif", fontWeight: 700, background: `linear-gradient(135deg, ${user.avatarColor} 0%, #3b82f6 100%)`, boxShadow: `0 4px 12px ${user.avatarColor}44`, flexShrink: 0 }}>
                        {user.firstName[0]}{user.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#e2e8f0", lineHeight: 1.2 }}>
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", mt: 0.2 }}>
                          Joined {user.joined}
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <CopyText text={user.token} display={user.token} />
                      <Box sx={{ mt: 0.3 }}>
                        <CopyText text={user.id} display={user.id} />
                      </Box>
                    </Box>
                  </Box>

                  {i < paginated.length - 1 && <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />}
                </Box>
              ))
            )}

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            {/* pagination */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 2.5, sm: 3 }, py: 1.8 }}>
              <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}>
                Showing{" "}
                <Box component="span" sx={{ color: "rgba(255,255,255,0.5)" }}>
                  {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)}
                </Box>{" "}
                of{" "}
                <Box component="span" sx={{ color: "rgba(255,255,255,0.5)" }}>{filtered.length}</Box>{" "}
                users
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton disabled={currentPage === 1} onClick={() => setPage((p) => p - 1)} sx={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "rgba(255,255,255,0.4)", width: 32, height: 32, "&:hover:not(:disabled)": { borderColor: "rgba(124,58,237,0.5)", color: "#a78bfa", background: "rgba(124,58,237,0.08)" }, "&:disabled": { opacity: 0.25 } }}>
                  <ChevronLeft fontSize="small" />
                </IconButton>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button key={p} onClick={() => setPage(p)} sx={{ minWidth: 32, height: 32, borderRadius: "10px", fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", fontWeight: p === currentPage ? 700 : 400, border: p === currentPage ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.08)", color: p === currentPage ? "#a78bfa" : "rgba(255,255,255,0.35)", background: p === currentPage ? "rgba(124,58,237,0.12)" : "transparent", transition: "all 0.15s", p: 0, "&:hover": { borderColor: "rgba(124,58,237,0.4)", color: "#a78bfa", background: "rgba(124,58,237,0.07)" } }}>
                    {p}
                  </Button>
                ))}

                <IconButton disabled={currentPage === totalPages} onClick={() => setPage((p) => p + 1)} sx={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "rgba(255,255,255,0.4)", width: 32, height: 32, "&:hover:not(:disabled)": { borderColor: "rgba(124,58,237,0.5)", color: "#a78bfa", background: "rgba(124,58,237,0.08)" }, "&:disabled": { opacity: 0.25 } }}>
                  <ChevronRight fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Settings modal */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} sx={modalSx}>
        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", letterSpacing: "-0.02em", mb: 0.5 }}>Settings</Typography>
          <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", mb: 2.5 }}>Manage your API key</Typography>
          <TextField fullWidth size="small" label="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} sx={{ ...modalInputSx, mb: 2.5 }} />
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button fullWidth sx={cancelBtnSx} onClick={() => setSettingsOpen(false)}>Cancel</Button>
            <Button fullWidth sx={saveBtnSx} onClick={() => setSettingsOpen(false)}>Save</Button>
          </Box>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        </DialogContent>
      </Dialog>

      {/* Add Lead modal */}
      <Dialog open={addLeadOpen} onClose={() => setAddLeadOpen(false)} sx={modalSx}>
        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", letterSpacing: "-0.02em", mb: 0.5 }}>Add Lead</Typography>
          <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", mb: 2.5 }}>Fill in the lead details</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2.5 }}>
            <TextField fullWidth size="small" label="Name" value={leadForm.name} onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))} sx={modalInputSx} />
            <TextField fullWidth size="small" label="Token" value={leadForm.token} onChange={(e) => setLeadForm((f) => ({ ...f, token: e.target.value }))} sx={modalInputSx} />
            <TextField fullWidth size="small" label="Order number" value={leadForm.order} onChange={(e) => setLeadForm((f) => ({ ...f, order: e.target.value }))} sx={modalInputSx} />
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button fullWidth sx={cancelBtnSx} onClick={() => setAddLeadOpen(false)}>Cancel</Button>
            <Button fullWidth sx={saveBtnSx} onClick={handleLeadSave}>Add Lead</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}