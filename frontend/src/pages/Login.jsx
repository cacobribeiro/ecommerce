import { useState } from "react";
import { Alert, Box, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Section from "../components/Section.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import SecondaryButton from "../components/SecondaryButton.jsx";
import { loginRequest } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
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
      navigate("/minha-conta");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Section>
      <Box sx={{ maxWidth: 480, mx: "auto" }}>
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Typography variant="h4">Iniciar sessão</Typography>
          <Typography variant="body1" color="text.secondary">
            Acesse sua área pessoal e acompanhe sua jornada.
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
          <SecondaryButton component={Link} to="/cadastro">
            Criar conta
          </SecondaryButton>
        </Stack>
      </Box>
    </Section>
  );
};

export default Login;
