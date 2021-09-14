const getDB = require("../../db");

const reservedProduct = async (req, res, next) => {
  let connection;
  try {
    // creo la conexion al DB
    connection = await getDB();

    const { placeDelivery, timeDelivery } = req.body;
    const { product_id, idSale } = req.body;
 
    const [sale] = await connection.query(`
        SELECT idSale FROM sales WHERE idSale=?
    `[idSale]
    );

  // Verifica que exista la petición de reserva 
    if (sale.length === 0) {
      const error = new Error("La petición de compra no existe.");
      error.httpStatus = 404;
      throw error;
    }

   // Seleccionar producto que está en status reserved
   const [reserv] = await connection.query(`
        SELECT product_id FROM products WHERE product_id=? AND reserved=true`,
        [product_id]
   );
   
   // Cada producto puede estar en status reservado 1 vez hasta que cambie su status

   if (reserv.length !=0) {
     const error = new Error("EL producto ya ha sido reservado.");
     error.httpStatus = 404;
     throw error;
   }

  // El usuario comprador establece un lugar y hora para la transacción
  await connection.query(`
    UPDATE sales SET placeDelivery=?, dateDelivey=?, effectiveSale=true WHERE idSale=?`,
    [placeDelivery, timeDelivery, idSale]
  );

  // Marcar el producto como reservado
  await connection.query(`
  UPDATE products SET reserved=true WHERE product_id=?`,
  [product_id]
  );
      

    res.send({
      status: "ok",
      data: {
        idSale: idSale,
        placeDelivery,
        timeDelivery,
        product_id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = reservedProduct;
