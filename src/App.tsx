import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/logingape";
import UsersPage from "../src/pages/mainpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/users" element={<UsersPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;