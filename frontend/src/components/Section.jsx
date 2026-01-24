import { Box, Container, Typography } from "@mui/material";

const Section = ({ title, subtitle, children }) => (
  <Box component="section" sx={{ py: 6 }}>
    <Container>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Container>
  </Box>
);

export default Section;
