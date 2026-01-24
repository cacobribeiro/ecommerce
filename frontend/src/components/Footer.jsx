import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { contactInfo, footerLinks } from "../data/content.js";

const Footer = () => (
  <Box
    sx={{
      py: 6,
      bgcolor: "#f1e7dd",
      borderTop: "1px solid rgba(132, 95, 63, 0.25)",
      boxShadow: "0 -8px 16px rgba(0, 0, 0, 0.08)",
    }}
  >
    <Container>
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif" }}>
          Caminho do Ser
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} flexWrap="wrap">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.to} underline="none" color="text.primary">
              {link.label}
            </Link>
          ))}
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            Contato: {contactInfo.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Telefone: {contactInfo.phone}
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Caminho do Ser. Todos os direitos reservados.
        </Typography>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
