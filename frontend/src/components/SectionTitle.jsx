import { Stack, Typography } from "@mui/material";

const SectionTitle = ({ overline, title, subtitle, align = "left" }) => (
  <Stack spacing={1} sx={{ textAlign: align, mb: 4 }}>
    {overline && (
      <Typography variant="overline" color="secondary.main" fontWeight={600}>
        {overline}
      </Typography>
    )}
    <Typography variant="h3">{title}</Typography>
    {subtitle && (
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
    )}
  </Stack>
);

export default SectionTitle;
