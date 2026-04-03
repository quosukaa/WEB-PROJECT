import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/logingape";
import UsersPage from "../src/pages/mainpage";
import WalletAgentPage from "../src/pages/scapage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/scampage" element={<WalletAgentPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;