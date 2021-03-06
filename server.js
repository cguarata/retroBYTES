require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const {
  listProducts,
  newProduct,
  getProduct,
  modProduct,
  deleteProduct,
  addProductPhoto,
  deleteProductPhoto,
  voteProduct,
  listCategories,
} = require("./controllers/products");

const {
  loginUser,
  newUser,
  validateUser,
  getUser,
  deleteUser,
  editUserPassword,
  editUser,
  recoverUserPassword,
  resetUserPassword,
} = require("./controllers/users");

// controladores compra-venta:
const {
  saleRequest,
  reservedProduct,
  rejectRequest,
  statusRequest,
  // effectiveSale,
  bookings,
  listRequests,
  valuePurchase,
} = require("./controllers/buy_sell");


// require de los MIDDLEWARES
const productExists = require("./middlewares/productExists");
const isUser = require("./middlewares/isUser");
const canEdit = require("./middlewares/canEdit");
// const canModify = require("./middlewares/canEdit");
const userExists = require("./middlewares/userExists");
const requestExists = require("./middlewares/requestExists");

const { PORT, HOST, UPLOAD_DIRECTORY } = process.env;

// creo app express
const app = express();

// cors
app.use(cors());

// uso middleware morgan
app.use(morgan("dev"));

// middleware que parsea el body json
app.use(express.json());

// middleware recursos statico
app.use(express.static(path.join(__dirname, UPLOAD_DIRECTORY)));

// body parser para la subida de imagenes (multipart form data)
// multer o express-fileupload
app.use(fileUpload());

// ruta  GET /
app.get("/", (req, res, next) => {
  res.send({
    status: "ok",
    message: "Home page",
  });
});



/*
 * ENDPOINT PRODUCTS
 */

// GET - /products - JSON con lista todos los productos
app.get("/products", listProducts);

// GET - /products/:id - JSON que muestra información de un producto
app.get("/products/:id", productExists, getProduct);

// POST - /products - crea una entrada
app.post("/products", isUser, newProduct);

// PUT - /products/:id - edita el lugar o descripción de un producto
app.put("/products/:id", isUser, productExists, canEdit, modProduct);

// DELETE - /products/:id - borra un producto
app.delete("/products/:id", isUser, productExists, canEdit, deleteProduct);

// POST - /products/:id/photos - añade una imagen a un producto
app.post(
  "/products/:id/photos",
  isUser,
  productExists,
  canEdit,
  addProductPhoto
);

// DELETE - /products/:id/photos/:photoID - borra una imagen de un producto
app.delete(
  "/products/:id/photos/:photoID",
  isUser,
  productExists,
  canEdit,
  deleteProductPhoto
);

//GET para hacer una búsqueda con query string
app.get("/search", listProducts);

// GET -/categories : devuelve elementos de categoría
app.get("/categories", listCategories);

// GET - /categories/:category_id/:product_id : mostrar un producto
app.get("/categories/:category_id/:product_id", productExists, getProduct);

// POST - /products/:id/votes - vota un producto
app.post("/products/:id/votes", isUser, productExists, voteProduct);

/*
 * ENDPOINT USERS
 */

// POST - /users - Crear un usuario pendiente de activar
app.post("/users", newUser);

// GET - /users/validate/:registrationCode - Validará un usuario recien registrado
app.get("/users/validate/:registrationCode", validateUser);

// POST - /users/login - Hará el login de un usuario y devolverá el TOKEN
app.post("/users/login", loginUser);

// GET - /users/:id - Devolver información del usuario
app.get("/users/:id", isUser, userExists, getUser);

// DELETE - /users/:id - Borrar un usuario | Solo lo puede hacer el admin o si mismo
app.delete("/users/:id", isUser, userExists, deleteUser);

// PUT - /users/:id - Editar un usuario (name, email, avatar) | Solo el propio usuario
app.put("/users/:id", isUser, userExists, editUser);

// PUT - /users/:id/password - Editar la contraseña de un usuario | Solo el propio usuario
app.put("/users/:id/password", isUser, userExists, editUserPassword);

// enviar al email del usuario un código para la recuperación
app.post("/users/recoverpassword", recoverUserPassword);

// usar ese código para cambiar la contraseña sin acceder previamente
app.post("/users/resetpassword", resetUserPassword);

/*
 * ENDPOINT COMPRA Y VENTA
 */

// proponer compra
app.post("/buy/:id/proposal", productExists, isUser, saleRequest);

// reserva de producto y enviar datos de entrega
app.put(
  "/:id/reserve/:idSale",
  isUser,
  productExists,
  reservedProduct
  );
  
// rechazar propuesta de compra
app.delete(
  "/:id/reject/:idSale", 
  isUser,
  productExists, 
  requestExists,
  rejectRequest
  );
  
  // listar solicitudes compra
  app.get("/requests/:id", userExists, listRequests);

// listar reservas de un usuario
app.get(
  "/bookings/:user_id", 
  isUser, 
  bookings);

  // status de reserva
  app.get(
  "/:id/status/:idSale", 
  isUser,
  productExists,
  statusRequest
  );
  
// valorar compra
app.post(
  "/ranking_user/:user_id/:idSale",
  isUser,
  requestExists,
  valuePurchase
  );
  

  // middleware de error
  app.use((error, req, res, next) => {
    res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// middleware 404
app.use((req, res, next) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor funcionando en http://${HOST}:${PORT}`);
});
