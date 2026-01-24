import { Button } from "@mui/material";

const PrimaryButton = (props) => (
  <Button
    variant="contained"
    color="primary"
    sx={{ boxShadow: "0 12px 30px rgba(109, 74, 166, 0.25)" }}
    {...props}
  />
);

export default PrimaryButton;
