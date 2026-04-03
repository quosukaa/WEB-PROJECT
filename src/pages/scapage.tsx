import { useState, useEffect } from "react";
import { useRef } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  AccountBalanceWallet,
  SwapHoriz,
  TrendingUp,
  TrendingDown,
  CheckCircleOutline,
  HourglassEmpty,
  ErrorOutline,
} from "@mui/icons-material";
import Header from "../components/header";
import Footer from "../components/footer";

// типы 

interface Agent {
  address: string;
  added: string;
  network: string;
  totalUSD: string;
}

interface Coin {
  name: string;
  symbol: string;
  amount: string;
  usd: string;
  color: string;
  change: string;
}

type ActionStatus = "success" | "pending" | "failed";

interface Action {
  id: string;
  time: string;
  type: string;
  from: string;
  to: string;
  amount: string;
  coin: string;
  status: ActionStatus;
  gas: string;
  hash: string;
}

const MOCK_AGENT: Agent = {
  address: "0x4f2a...c91d",
  added: "18 Mar 2025",
  network: "EVM",
  totalUSD: "$24,183.50",
};

const MOCK_COINS: Coin[] = [
  { name: "Ethereum", symbol: "ETH",  amount: "6.42",     usd: "$19,812.00", color: "#6366f1", change: "+2.3%" },
];

const MOCK_ACTIONS: Action[] = [
  { id: "1", time: "02 Apr 2026  14:32", type: "Transfer", from: "0x4f2a...c91d", to: "0x8e1b...44fa", amount: "1.20",  coin: "ETH",  status: "success", gas: "$3.14", hash: "0xabc1..." },
];



function useWalletData() {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   // тута реал запросы 

    
    const timer = setTimeout(() => {
      setAgent(MOCK_AGENT);
      setCoins(MOCK_COINS);
      setActions(MOCK_ACTIONS);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { agent, coins, actions, loading };
}

// бгшка 

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.6 + 0.2,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;
      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
        const a = 0.3 + 0.7 * Math.abs(Math.sin(t + s.twinkleOffset));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// визуалка

const glassSx = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  backdropFilter: "blur(24px)",
  boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
};

const STATUS_CFG: Record<ActionStatus, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  success: { label: "Success", color: "#4ade80", bg: "rgba(74,222,128,0.1)",  Icon: CheckCircleOutline },
  pending: { label: "Pending", color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  Icon: HourglassEmpty },
  failed:  { label: "Failed",  color: "#f87171", bg: "rgba(248,113,113,0.1)", Icon: ErrorOutline },
};

function StatusChip({ status }: { status: ActionStatus }) {
  const { label, color, bg, Icon } = STATUS_CFG[status];
  return (
    <Chip
      icon={<Icon sx={{ fontSize: "0.75rem !important" }} />}
      label={label}
      size="small"
      sx={{
        fontFamily: "'Sora', sans-serif",
        fontSize: "0.7rem",
        fontWeight: 500,
        color,
        background: bg,
        border: `1px solid ${color}22`,
        borderRadius: "8px",
        height: "22px",
        "& .MuiChip-icon": { color, ml: "6px" },
        "& .MuiChip-label": { px: "7px" },
      }}
    />
  );
}

// сама страница ряльна

export default function WalletAgentPage() {
  const [poured, setPoured] = useState(false);
  const { agent, coins, actions, loading } = useWalletData();

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", background: "#0a0910", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#7c3aed" }} />
      </Box>
    );
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');`}</style>

      <Box sx={{ minHeight: "100vh", background: "#0a0910", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden", py: 12 }}>
        <Starfield />
        <Header />
        <Footer />

        <Box sx={{ position: "fixed", top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

        <Box sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "860px", mx: "auto", px: 2, display: "flex", flexDirection: "column", gap: 2.5 }}>

          {/* первый блок вплет агент + монеты */}
          <Box sx={{ ...glassSx, p: { xs: 2.5, sm: 3 } }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ width: 44, height: 44, borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(124,58,237,0.35)", flexShrink: 0 }}>
                  <AccountBalanceWallet sx={{ color: "#fff", fontSize: "1.2rem" }} />
                </Box>
                <Box>
                  <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                    Wallet Agent
                  </Typography>
                  {/*  слот: agent.address, agent.network */}
                  <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", mt: 0.3 }}>
                    {agent?.address} · {agent?.network}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                <Box sx={{ px: 2, py: 0.6, borderRadius: "10px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}>
                  {/*  слот: agent.added */}
                  <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
                    Добавлен: <Box component="span" sx={{ color: "#a78bfa", fontWeight: 600 }}>{agent?.added}</Box>
                  </Typography>
                </Box>
                <Box sx={{ px: 2, py: 0.6, borderRadius: "10px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
                  {/*  слот: agent.totalUSD */}
                  <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", color: "#4ade80", fontWeight: 600 }}>
                    {agent?.totalUSD}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2.5 }} />

            <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", px: 1, mb: 1 }}>
              {["Монета", "Кол-во", "USD", "24h"].map((h) => (
                <Typography key={h} sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.67rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {h}
                </Typography>
              ))}
            </Box>

            {/*  слот: coins[] из апишки */}
            {coins.map((coin, i) => {
              const isUp = coin.change.startsWith("+");
              const isFlat = coin.change === "0.0%";
              const changeColor = isFlat ? "rgba(255,255,255,0.3)" : isUp ? "#4ade80" : "#f87171";
              return (
                <Box key={coin.symbol}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", alignItems: "center", px: 1, py: 1.4, borderRadius: "12px", transition: "background 0.15s", "&:hover": { background: "rgba(124,58,237,0.05)" } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 32, height: 32, borderRadius: "10px", background: `${coin.color}22`, border: `1px solid ${coin.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.6rem", fontWeight: 700, color: coin.color }}>
                          {coin.symbol.slice(0, 3)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#e2e8f0", lineHeight: 1.2 }}>
                          {coin.name}
                        </Typography>
                        <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.67rem", color: "rgba(255,255,255,0.25)" }}>
                          {coin.symbol}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{coin.amount}</Typography>
                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.8rem", color: "#e2e8f0", fontWeight: 500 }}>{coin.usd}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      {!isFlat && (isUp ? <TrendingUp sx={{ fontSize: "0.85rem", color: "#4ade80" }} /> : <TrendingDown sx={{ fontSize: "0.85rem", color: "#f87171" }} />)}
                      <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: changeColor }}>{coin.change}</Typography>
                    </Box>
                  </Box>
                  {i < coins.length - 1 && <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />}
                </Box>
              );
            })}
          </Box>

          {/*блок 2 кнопка перелива*/}
          <Box sx={{ ...glassSx, p: { xs: 2.5, sm: 3 }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
            <Box>
              <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", letterSpacing: "-0.02em", mb: 0.4 }}>
                Перелив средств
              </Typography>
              <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                Переводит все активы мамонта на дроп-кошелёк агента
              </Typography>
            </Box>
            <Button
              onClick={() => setPoured(true)}
              disabled={poured}
              startIcon={<SwapHoriz />}
              sx={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: "0.88rem",
                textTransform: "none",
                borderRadius: "12px",
                py: 1.2,
                px: 3,
                background: poured ? "rgba(74,222,128,0.12)" : "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
                color: poured ? "#4ade80" : "#fff",
                border: poured ? "1px solid rgba(74,222,128,0.3)" : "none",
                boxShadow: poured ? "none" : "0 8px 24px rgba(124,58,237,0.35)",
                transition: "all 0.3s ease",
                "&:hover:not(:disabled)": { background: "linear-gradient(135deg, #6d28d9 0%, #2563eb 100%)", boxShadow: "0 12px 32px rgba(124,58,237,0.45)" },
                "&:disabled": { opacity: 1 },
              }}
            >
              {poured ? "Перелив запущен" : "Начать перелив"}
            </Button>
          </Box>

          {/*блок 3 действия лузера которого нагрели на лавешку*/}
          <Box sx={{ ...glassSx, overflow: "hidden" }}>
            <Box sx={{ px: { xs: 2.5, sm: 3 }, py: 2.2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", letterSpacing: "-0.02em" }}>
                  Действия мамонта
                </Typography>
                <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", mt: 0.3 }}>
                  История транзакций Wallet Agent
                </Typography>
              </Box>
              {/*  слот: actions.length из пишки */}
              <Box sx={{ px: 2, py: 0.6, borderRadius: "10px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}>
                <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", color: "#a78bfa", fontWeight: 600 }}>
                  {actions.length} записей
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            <Box sx={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1.2fr 1fr 0.8fr 0.9fr", px: { xs: 2.5, sm: 3 }, py: 1.2, background: "rgba(255,255,255,0.025)" }}>
              {["Время", "Тип", "Сумма", "Комиссия", "Хэш", "Статус"].map((h) => (
                <Typography key={h} sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.67rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {h}
                </Typography>
              ))}
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            {/*  слот: actions[] из апишки */}
            {actions.length === 0 ? (
              <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Sora', sans-serif", color: "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>
                  Нет действий
                </Typography>
              </Box>
            ) : (
              actions.map((action, i) => (
                <Box key={action.id}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1.2fr 1fr 0.8fr 0.9fr", alignItems: "center", px: { xs: 2.5, sm: 3 }, py: 1.6, transition: "background 0.15s", "&:hover": { background: "rgba(124,58,237,0.05)" } }}>
                    <Box>
                      <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", color: "#e2e8f0", lineHeight: 1.3 }}>
                        {action.time.split("  ")[0]}
                      </Typography>
                      <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.67rem", color: "rgba(255,255,255,0.25)", mt: 0.2 }}>
                        {action.time.split("  ")[1]}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      <SwapHoriz sx={{ fontSize: "0.85rem", color: "rgba(124,58,237,0.7)" }} />
                      <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.55)" }}>{action.type}</Typography>
                    </Box>
                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.78rem", color: "#e2e8f0", fontWeight: 500 }}>
                      {action.amount} <Box component="span" sx={{ color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>{action.coin}</Box>
                    </Typography>
                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{action.gas}</Typography>
                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.72rem", color: "#a78bfa", letterSpacing: "0.02em" }}>{action.hash}</Typography>
                    <StatusChip status={action.status} />
                  </Box>
                  {i < actions.length - 1 && <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />}
                </Box>
              ))
            )}
          </Box>

        </Box>
      </Box>
    </>
  );
}