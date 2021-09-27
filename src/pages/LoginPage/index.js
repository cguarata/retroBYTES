import { useState } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import {
  Grid,
  Box,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoginIcon from '@mui/icons-material/Login';
import VideoBkg from "../../components/plus/videobg";
// import Checkbox from "@material-ui/core/Checkbox";


const paperStyle = {
  padding: 20,
  height: "55vh",
  width: 480,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#f4a261" };
//   const btnstyle = { margin: "8px 0" };


const Login = () => {
  // creamos variables para cada input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setToken] = useUserTokenContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    // handleClose();
    const requestBody = {
      email,
      password,
    };
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (res.ok) {
      const body = await res.json();
      setToken(body.data.token);
      alert("Logueado correactamente");
    } else {
      alert("Hubo un error");
    }
  };

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="20vh"
      component="form"
      sx={{
        "& > :not(style)": { m: 3, width: "55ch" },
        
      }}
    >
      <Grid container >
        <Paper elevation={10} style={paperStyle}>
          <Grid item align="center">
            <Avatar style={avatarStyle} margin-top="10px" size={"2rem"}>
              <LoginIcon />
            </Avatar>
            <Box style={{ marginTop: "20px" }}>
              <Typography style={{ fontSize: "2rem", fontWeight: 600, textTransform:'uppercase' }}>
                Ingresar
              </Typography>
            </Box>
          </Grid>
          <form onSubmit={handleLogin}>
            <TextField
              style={{ marginTop: "20px" }}
              label="Email"
              placeholder="Introduce tu e-mail"
              fullWidth
              required
              inputProps={{ style: { fontSize: 30 } }}
              inputLabelProps={{ style: { fontSize: 30 } }}
              InputLabel={{ style: { fontSize: 90 } }}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              style={{ marginTop: "20px" }}
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              fullWidth
              required
              inputProps={{ style: { fontSize: 30 } }}
              inputLabelProps={{ style: { fontSize: 30 } }}
              InputLabel={{ style: { fontSize: 90 } }}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        /> */}
            <Button
              type="submit"
              onClick={handleLogin}
              size="large"
              color="primary"
              variant="contained"
              //   style={btnstyle}
              fullWidth
              style={{ marginTop: "20px", fontSize: "2rem" }}
            >
              Entrar
            </Button>
          </form>
            <Typography style={{ marginTop: "20px", fontSize: "1.5rem" }}>
              <Link href="#">Olvidaste tu contraseña?</Link>
            </Typography>
            <Typography style={{ marginTop: "20px", fontSize: "2rem" }}>
              {" "}
              ¿Aún no tienes una cuenta?
              <Link href="/register"> Regístrate</Link>
            </Typography>
        </Paper>
    
      <VideoBkg />
      </Grid>
    </Box>
  );
};

export default Login;
