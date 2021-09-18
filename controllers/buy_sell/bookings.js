const getDB = require("../../db");

const bookings = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id: user_id } = req.params;

    const [result] = await connection.query(
      `
      SELECT sales.idSale, sales.product_id, sales.status, users.name
      FROM sales LEFT JOIN user_ranking ON (user_ranking.idSale = sales.idSale)
     INNER JOIN products ON (product_id = sales.product_id)
     INNER JOIN users ON (user_id) WHERE userBuyer_id=12 `,
      [user_id]
    );

    if (result === 0) {
      const error = new Error("No has reservado este anuncio.");
      error.httpStatus = 403;
      throw error;
    }

    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = bookings;