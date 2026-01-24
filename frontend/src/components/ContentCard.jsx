import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import PrimaryButton from "./PrimaryButton.jsx";
import SecondaryButton from "./SecondaryButton.jsx";

const ContentCard = ({ title, description, image, actionLabel, actionHref, variant = "primary" }) => {
  const ActionButton = variant === "secondary" ? SecondaryButton : PrimaryButton;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {image && <CardMedia component="img" height="180" image={image} alt={title} />}
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      </CardContent>
      {actionLabel && (
        <Stack sx={{ p: 2, pt: 0 }}>
          <ActionButton href={actionHref} fullWidth>
            {actionLabel}
          </ActionButton>
        </Stack>
      )}
    </Card>
  );
};

export default ContentCard;
