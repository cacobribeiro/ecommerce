import { useState } from "react";
import { Alert, Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Section from "../components/Section.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import SecondaryButton from "../components/SecondaryButton.jsx";
import { registerRequest } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const levels = ["iniciante", "intermediario", "avancado", "professor"];

const Cadastro = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    level: "iniciante",
    goal: "",
    preferredDays: "",
    preferredTimes: ""
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await registerRequest(form);
      login(data);
      navigate("/minha-conta");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Section>
      <Box sx={{ maxWidth: 560, mx: "auto" }}>
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Typography variant="h4">Criar conta</Typography>
          <Typography variant="body1" color="text.secondary">
            Conte um pouco sobre você para personalizar sua experiência.
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField name="name" label="Nome" value={form.name} onChange={handleChange} required />
          <TextField
            name="email"
            label="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Senha"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            select
            name="level"
            label="Nível"
            value={form.level}
            onChange={handleChange}
          >
            {levels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="goal"
            label="Objetivo com o yoga"
            value={form.goal}
            onChange={handleChange}
            multiline
            minRows={2}
          />
          <TextField
            name="preferredDays"
            label="Preferência de dias"
            value={form.preferredDays}
            onChange={handleChange}
          />
          <TextField
            name="preferredTimes"
            label="Preferência de horários"
            value={form.preferredTimes}
            onChange={handleChange}
          />
          <PrimaryButton type="submit">Cadastrar</PrimaryButton>
          <SecondaryButton component={Link} to="/login">
            Já tenho conta
          </SecondaryButton>
        </Stack>
      </Box>
    </Section>
  );
};

export default Cadastro;
