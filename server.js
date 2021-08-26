require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const { PORT, HOST } = process.env;
// creo app express
const app = express();

// uso middleware morgan
app.use(morgan("dev"));

// middleware que parsea el body
app.use(express.json());

//middleware que captura todas las rutas
app.get("/", (req,res,next) => {
    res.send({
        message: "Hola",
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Servidor funcionando en http://${HOST}:${PORT}`);
  });