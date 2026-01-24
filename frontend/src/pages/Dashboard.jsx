import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Section from "../components/Section.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { createSocket } from "../services/socket.js";
import { cancelBooking, createBooking, fetchBookings, fetchProfile } from "../services/api.js";

const Dashboard = () => {
  const { token, user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ date: "", type: "Yoga em grupo", notes: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const socket = useMemo(() => (token ? createSocket(token) : null), [token]);

  useEffect(() => {
    if (!token) return;
    fetchProfile(token).then(setProfile).catch(() => null);
    fetchBookings(token).then((data) => setBookings(data.bookings)).catch(() => null);
  }, [token]);

  useEffect(() => {
    if (!socket) return undefined;

    socket.on("booking:created", (booking) => {
      setBookings((prev) => [booking, ...prev]);
      setMessage("Novo agendamento confirmado! Confira seus detalhes abaixo.");
    });

    socket.on("booking:cancelled", (booking) => {
      setBookings((prev) => prev.map((item) => (item.id === booking.id ? booking : item)));
    });

    return () => socket.disconnect();
  }, [socket]);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleBooking = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await createBooking(token, form);
      setBookings((prev) => [response.booking, ...prev]);
      setMessage("Agendamento enviado! Um aviso será enviado por e-mail.");
      setForm((prev) => ({ ...prev, notes: "" }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = async (id) => {
    setError("");
    setMessage("");
    try {
      const response = await cancelBooking(token, id);
      setBookings((prev) => prev.map((item) => (item.id === id ? response.booking : item)));
      setMessage("Agendamento cancelado.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
      <Section title="Área do aluno" subtitle="Seus dados e próximos passos.">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Cadastro</Typography>
                <Typography variant="body2">Nome: {profile?.name}</Typography>
                <Typography variant="body2">E-mail: {profile?.email}</Typography>
                <Typography variant="body2">Plano: {profile?.plan}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Stack spacing={2} component="form" onSubmit={handleBooking}>
                  <Typography variant="h6">Agendar aula</Typography>
                  {message && <Alert severity="success">{message}</Alert>}
                  {error && <Alert severity="error">{error}</Alert>}
                  <TextField
                    name="date"
                    label="Data e horário"
                    type="datetime-local"
                    value={form.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                  <TextField
                    name="type"
                    label="Tipo de aula"
                    value={form.type}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    name="notes"
                    label="Observações"
                    value={form.notes}
                    onChange={handleChange}
                    multiline
                    rows={3}
                  />
                  <PrimaryButton type="submit">Solicitar agendamento</PrimaryButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Section>

      <Section title="Próximos agendamentos">
        <Grid container spacing={2}>
          {bookings.map((booking) => (
            <Grid item xs={12} md={4} key={booking.id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">{booking.type}</Typography>
                  <Typography variant="body2">
                    {new Date(booking.date).toLocaleString("pt-BR")}
                  </Typography>
                  <Typography variant="body2">Status: {booking.status}</Typography>
                  {booking.status === "confirmado" && (
                    <PrimaryButton
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancelar
                    </PrimaryButton>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
          {!bookings.length && (
            <Typography variant="body2" color="text.secondary">
              Nenhum agendamento ainda. Use o formulário acima para solicitar sua aula.
            </Typography>
          )}
        </Grid>
      </Section>
    </Box>
  );
};

export default Dashboard;
