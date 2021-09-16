const getDB = require("../../db");

const reservedProduct = async (req, res, next) => {
  let connection;
  try {
    // creo la conexion al DB
    connection = await getDB();
 // Sacamos los campos necesarios:
    const { placeDelivery, timeDelivery } = req.body;
    const { id:product_id, idSale } = req.params;
    const userBuyer_id = req.userAuth.id;
 
     // se crea la reserva
    const [results] = await connection.query(`
        SELECT idSale FROM sales WHERE product_id=? AND userBuyer_id=?`,
    [idSale, product_id, userBuyer_id]
    );

  // Verifica que exista la petición de reserva 
    if (results.length === 0) {
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
     const error = new Error("El producto ya ha sido reservado.");
     error.httpStatus = 404;
     throw error;
   }

  // El usuario comprador establece un lugar y hora para la transacción
  await connection.query(`
    UPDATE sales SET placeDelivery=?, dateDelivey=?, status=true WHERE idSale=?`,
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
