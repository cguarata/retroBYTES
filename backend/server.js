require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const { PORT, HOST } = process.env;

const app = express();

app.use(morgan("dev"));

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