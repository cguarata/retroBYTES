const getDB = require("../../db");

const userSellerBookings = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [result] = await connection.query(
      `
        SELECT *
        FROM sales s
        LEFT JOIN products p ON (s.product_id = p.id)
        LEFT JOIN users u ON (p.user_id = u.id)
        WHERE u.id =?

      `,
      [req.userAuth.id]
    );

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

module.exports = userSellerBookings;
