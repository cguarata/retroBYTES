const getDB = require("../db");

const purchaseExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { salesId } = req.params;

    const [result] = await connection.query(
      `
            SELECT sales_id FROM sales WHERE idSale=?`,
      [salesId]
    );

    if (result.length === 0) {
      const error = new Error("No existe esta compra.");
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

module.exports = purchaseExists;
