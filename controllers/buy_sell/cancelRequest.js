const getDB = require("../../db");

const cancelRequest = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idSale } = req.params;

    const [result] = await connection.query(
      `
      SELECT * FROM sales WHERE idSale=?`,
      [idSale]
    );

    if (result[0].vendido === 1) {
      const error = new Error("El producto ya ha sido vendido.");
      throw error;
    }

    await connection.query(
      `
        DELETE FROM sales WHERE idSale=?`,
      [idCompra]
    );

    res.send({
      status: "ok",
      message: `La solicitud de compra con el id ${idCompra} ha sido cancelada.`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = cancelRequest;