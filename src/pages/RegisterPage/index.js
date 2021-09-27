import { useState } from "react";
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import VideoBkg from "../../components/plus/videobg"; 
import {
  Grid,
  Box,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  // Link,
} from "@material-ui/core";

const paperStyle = {
  padding: 20,
  height: "55vh",
  width: 480,
  margin: "20px auto",
};

const avatarStyle = { backgroundColor: "#f4a261" };

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
    };

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if(res.ok) {
      alert("Te has registrado correctamente. Activa tu usuario")
    } else {
      alert("Hubo un error en el registro")
    }
  };
  return (
    <>
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
              <VpnKeyRoundedIcon />
            </Avatar>
          <Box style={{ marginTop: "20px" }}>
              <Typography style={{ fontSize: "2rem", fontWeight: 600, textTransform:'uppercase' }}>
        Registro
        </Typography>
            </Box>
      </Grid>
      <form onSubmit={handleRegister}>
      <TextField
              style={{ marginTop: "20px" }}
              label="Email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              fullWidth
              value={email}
              required
              inputProps={{ style: { fontSize: 30 } }}
              inputLabelProps={{ style: { fontSize: 30 } }}
              InputLabel={{ style: { fontSize: 90 } }}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
        {/* <div className="txt_field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div> */}
        
        <TextField
              style={{ marginTop: "20px" }}
              id="password"
              name="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              fullWidth
              value={password}
              required
              inputProps={{ style: { fontSize: 30 } }}
              inputLabelProps={{ style: { fontSize: 30 } }}
              InputLabel={{ style: { fontSize: 90 } }}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
{/* 
        <div className="txt_field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div> */}
          <Button
              type="submit"
              onClick={handleRegister}
              size="large"
              color="secondary"
              variant="contained"
              //   style={btnstyle}
              fullWidth
              style={{ marginTop: "20px", fontSize: "2rem" }}
            >
              Registro </Button>
      </form>
      <VideoBkg />
        </Paper>
      </Grid>
        </Box>
     
    </>
  );
};

export default Register;
