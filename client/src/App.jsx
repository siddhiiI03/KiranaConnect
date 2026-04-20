import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginKirana from "./pages/LoginKirana";
import LoginWholesaler from "./pages/LoginWholesaler";
import DashboardKirana from "./pages/DashboardKirana";
import DashboardWholesaler from "./pages/DashboardWholesaler";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kirana-login" element={<LoginKirana />} />
        <Route path="/wholesaler-login" element={<LoginWholesaler />} />
        <Route path="/kirana-dashboard" element={<DashboardKirana />} />
        <Route path="/wholesaler-dashboard" element={<DashboardWholesaler />} />
      </Routes>
    </BrowserRouter>
  );
}