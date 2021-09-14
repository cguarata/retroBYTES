const getDB = require("../../db");

const listRequests = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { user_id } = req.params;

    const [result] = await connection.query(
      `
        SELECT sales.idSale, sales.userBuyer_id, sales.product_id, sales.reserveMessage, sales.effectiveSale, sales.sold, users.name AS Buyer
        FROM sales INNER JOIN products ON (products.product_id = sales.product_id) INNER JOIN users ON (users.user_ide = sales.userBuyer_id) 
        WHERE products.user_id=? AND products.sold=0`,
      [user_id]
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

module.exports = listRequests;
