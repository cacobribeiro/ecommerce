import { Button } from "@mui/material";

const SecondaryButton = (props) => (
  <Button
    variant="outlined"
    color="secondary"
    sx={{ borderWidth: 1.5, "&:hover": { borderWidth: 1.5 } }}
    {...props}
  />
);

export default SecondaryButton;
