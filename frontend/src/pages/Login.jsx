import { useState } from "react";
import { Alert, Box, Container, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { loginRequest } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "lara@yoga.com", password: "123456" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await loginRequest(form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Typography variant="h4">Área do aluno</Typography>
          <Typography variant="body1" color="text.secondary">
            Faça login para acessar seus dados e agendamentos.
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            name="email"
            label="E-mail"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="password"
            label="Senha"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <PrimaryButton type="submit">Entrar</PrimaryButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
