const getDB = require("../../db");

const bookings = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { user_id } = req.params;

    const [booking] = await connection.query(
      `
        SELECT sales.idSale, sales.product_id, sales.effectiveSale, sales.sold, users.name  
        FROM sales LEFT JOIN valoracionUsuario ON (user_ranking.idSale = sales.idSale)
        INNER JOIN products ON (products.product_id = sales.product_id) 
        INNER JOIN users ON (users.product_id = products.user_id) WHERE userBuyer_id=? 
        AND user_ranking.id IS NULL`,
      [user_id]
    );

    if (booking === 0) {
      const error = new Error("No has reservado este anuncio.");
      error.httpStatus = 403;
      throw error;
    }

    res.send({
      status: "ok",
      data: booking,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = bookings;