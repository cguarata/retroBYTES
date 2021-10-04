const getDB = require("../db");

const requestExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idSale } = req.params;

    const [result] = await connection.query(
      `
            SELECT idSale FROM sales  WHERE idSale=?
            `,
      [idSale]
    );

    if (result.length === 0) {
      const error = new Error("No existe compra con este id");
      error.httpStatus = 404;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = requestExists;
