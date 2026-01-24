import { Box, Container, Typography } from "@mui/material";

const Footer = () => (
  <Box sx={{ py: 4, bgcolor: "secondary.main" }}>
    <Container>
      <Typography variant="body2" color="text.secondary">
        Yoga em Movimento • Aulas ao vivo no Google Meet • Pagamento antecipado
      </Typography>
    </Container>
  </Box>
);

export default Footer;
