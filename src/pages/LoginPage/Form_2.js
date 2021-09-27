import { useState } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Grid, Paper, Box, Typography} from "@material-ui/core";
import { makeStyles, TextField } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },

}));

const Login = ( handleClose ) => {
  const classes = useStyles();
  // creamos variables para cada input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setToken] = useUserTokenContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password );
    handleClose();
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
    <>
    <Box m="auto"
      // display="flex" 
      // width={800} height={600} 
      // bgcolor="lightgreen"
      // alignItems="center"
      // justifyContent="center"
    >
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 600, flexGrow: 1 }}>
    <Grid container spacing={0} justify="center" direction="row">
    <Typography component="h1" variant="h3">Login</Typography>
      <form className={classes.root} onSubmit={handleLogin}>
    <Grid item>
        <TextField>
          {/* <label htmlFor="email">Correo electrónico</label> */}
          <input
            defaultValue="Hello World"
            variant="filled"
            id="email"
            name="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </TextField>
        </Grid>
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
        </div>
        <div>
        <button type="submit" variant="contained" color="primary" onCLick={handleLogin}>Loguearme</button>
        </div>
      </form>
    </Grid>
    </Paper>
    </Box>
    </>
  );
};


export default Login;
