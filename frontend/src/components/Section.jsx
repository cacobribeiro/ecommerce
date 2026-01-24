import { Box, Container } from "@mui/material";

const Section = ({ children, variant = "light" }) => {
  const background = variant === "dark" ? "#f1e7dd" : "transparent";
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: background }}>
      <Container>{children}</Container>
    </Box>
  );
};

export default Section;
