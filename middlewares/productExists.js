const getDB = require("../db");

const productExists = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    // comprobar si existe la entry
    const [result] = await connection.query(
      `
     SELECT id FROM products WHERE id=?
     `,
      [id]
    );

    if (result.length === 0) {
      const error = new Error("No existe ningún producto con este id");
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

module.exports = productExists;
