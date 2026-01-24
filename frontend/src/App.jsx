import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import NavBar from "./components/NavBar.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Admin from "./pages/Admin.jsx";
import Agenda from "./pages/Agenda.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Contato from "./pages/Contato.jsx";
import GravadaCategoria from "./pages/GravadaCategoria.jsx";
import Gravadas from "./pages/Gravadas.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Loja from "./pages/Loja.jsx";
import MinhaConta from "./pages/MinhaConta.jsx";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <Box display="flex" flexDirection="column" minHeight="100vh">
    <NavBar />
    <Box component="main" flexGrow={1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/gravadas" element={<Gravadas />} />
        <Route path="/gravadas/:categoria" element={<GravadaCategoria />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/minha-conta"
          element={
            <PrivateRoute>
              <MinhaConta />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
    <Footer />
  </Box>
);

export default App;
