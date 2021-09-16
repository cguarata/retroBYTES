const getDB = require("../../db");

const saleRequest = async (req, res, next) => {
  let connection;
  try {
    // creo la conexion al DB
    connection = await getDB();

    // Sacamos los campos necesarios:
    const { id: product_id } = req.params;
    const userBuyer_id = req.userAuth.id;

    // se crea la compra:
    const [results] = await connection.query(
      `
   SELECT idSale FROM sales WHERE product_id=? AND userBuyer_id=?`,
      [product_id, userBuyer_id]
    );

    if (results[0]) {
      const error = new Error(
        "Ya has enviado propuesta de compra para este producto."
      );
      error.httpStatus = 403;
      throw error;
    }
    // insertar campos en la tabla sale:

    const [createdSale] = await connection.query(
      `
     INSERT INTO sales (userBuyer_id, product_id) 
     VALUES (?, ?)`,
      [userBuyer_id, product_id]
    );

    const { insertId } = createdSale;
    res.send({
      status: "ok",
      data: {
        idSale: insertId,
        userBuyer_id,
        product_id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = saleRequest;
