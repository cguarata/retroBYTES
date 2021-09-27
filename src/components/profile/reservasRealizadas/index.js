import { Box } from "@mui/system";
import Typography from "@material-ui/core/Typography";

function ReservasRealizadas() {
  return (
    <>
      <Typography
        style={{
          fontSize: "2rem",
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        Reservas realizadas
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        minWidth="60vh"
        sx={{
          "& > :not(style)": { m: 3, width: "80ch" },
        }}
      >
      </Box>
    </>
  );
}

export default ReservasRealizadas;