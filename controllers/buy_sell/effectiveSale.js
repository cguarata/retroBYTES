const getDB = require("../../db");

const effectiveSale = async (req, res, next) => {
    let connection;
    try {
      // creo la conexion al DB
      connection = await getDB();

      const { id, idSale } = req.params;
    // Seleccionar el idSale
    const [sale] = await connection.query(`
        SELECT idSale FROM sales WHERE idSale=?`, 
        [idSale]
    );

    // Mensaje de error si la solicitud de compra no existe:
    if (sale.length === 0) {
        const error = new Error("La solicitud de compra no existe.");
        error.httpStatus = 404;
        throw error;
      }
  
      // Seleccionar el anuncio que está reservado:
      const [reserved] = await connection.query(
        `
        SELECT id FROM products WHERE id=? AND reserved=true`,
        [product_id]
      );
  
      // Cada producto solo podrá ser marcado como reservado 1 vez:
      if (reserved.length === 0) {
        const error = new Error(
          "El producto aún no ha sido reservado."
        );
        error.httpStatus = 404;
        throw error;
      }
  
      // Producto vendido:
      await connection.query(
        `
        UPDATE products SET sold=true WHERE id=?`,
        [id]
      );
  
      await connection.query(
        `
      UPDATE sales SET sold=true WHERE id=?
      `,
        [id]
      );
  
      //
  
      res.send({
        status: "ok",
        data: {
          idSale: idSale,
          product_id,
        },
      });
    } catch (error) {
      next(error);
    } finally {
      if (connection) connection.release();
    }
  };
  
  module.exports = effectiveSale;