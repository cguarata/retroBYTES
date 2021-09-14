const getDB = require("../../db");

const saleRequest = async (req, res, next) => {
  let connection;
  try {
    // creo la conexion al DB
    connection = await getDB();

 // Sacamos los campos necesarios:
 const { reserveMessage } = req.body;
 const { product_id } = req.params;
 const userBuyer_id = req.userAuth.id;

 // se crea la compra:
 const [current] = await connection.query(
   `
   SELECT idSale FROM sales WHERE idSale=? AND userBuyer_id=?`,
   [product_id, userBuyer_id]
 );

 // insertar campos en la tabla sale:
 if (current.length === 0) {
   const [result] = await connection.query(
     `
     INSERT INTO sales (userBuyer_id, product_id, reserveMessage) 
     VALUES (?, ?, ?)`,
     [userBuyer_id, product_id, reserveMessage]
   );

   const { insertId } = result;
   res.send({
     status: "ok",
     data: {
       idSale: insertId,
       reserveMessage,
       userBuyer_id,
       product_id,
     },
   });
 } else {
   const error = new Error("Ya has enviado propuesta de compra para este producto.");
   error.httpStatus = 403;
   throw error;
 }
} catch (error) {
 next(error);
} finally {
 if (connection) connection.release();
}
};

module.exports = saleRequest;
