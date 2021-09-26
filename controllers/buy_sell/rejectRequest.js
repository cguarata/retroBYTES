const getDB = require("../../db");

const rejectRequest = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idSale } = req.params;

    // seleccionar el id de la compra
    const [results] = await connection.query(
      `
        SELECT idSale 
        FROM sales
        WHERE idSale=?`,
      [ idSale]
    );

    // Verifica que exista la petición de reserva
    if (results.length === 0) {
      const error = new Error("La petición de compra no existe.");
      error.httpStatus = 404;
      throw error;
    }


    await connection.query(
      `
      UPDATE sales 
      SET status=false
      WHERE idSale=?`,
      [idSale]
    );

    res.send({
      status: "ok",
      message: `La solicitud de compra con el id ${idSale} ha sido cancelada.`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = rejectRequest;