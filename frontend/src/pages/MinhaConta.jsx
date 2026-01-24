import { useEffect, useState } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Section from "../components/Section.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchProfile } from "../services/api.js";

const MinhaConta = () => {
  const { token, user, logout, updateProfile } = useAuth();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    if (!token) return;
    fetchProfile(token)
      .then((data) => {
        setProfile(data);
        updateProfile(data);
      })
      .catch(() => null);
  }, [token, updateProfile]);

  return (
    <Section>
      <SectionTitle
        overline="Minha conta"
        title="Seu espaço pessoal"
        subtitle="Acompanhe seus dados e preferências." 
      />
      <Box sx={{ maxWidth: 600 }}>
        <Card>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="body1">Nome: {profile?.name}</Typography>
              <Typography variant="body1">E-mail: {profile?.email}</Typography>
              <Typography variant="body1">Nível: {profile?.level}</Typography>
              {profile?.goal && (
                <Typography variant="body2" color="text.secondary">
                  Objetivo: {profile?.goal}
                </Typography>
              )}
              {profile?.preferredDays && (
                <Typography variant="body2" color="text.secondary">
                  Preferência de dias: {profile?.preferredDays}
                </Typography>
              )}
              {profile?.preferredTimes && (
                <Typography variant="body2" color="text.secondary">
                  Preferência de horários: {profile?.preferredTimes}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
        <PrimaryButton sx={{ mt: 3 }} onClick={logout}>
          Sair
        </PrimaryButton>
      </Box>
    </Section>
  );
};

export default MinhaConta;
