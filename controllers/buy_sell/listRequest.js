const getDB = require("../../db");

const listRequests = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id: user_id } = req.params;

    const [result] = await connection.query(
      `
        SELECT sales.idSale, sales.userBuyer_id, sales.product_id, sales.status, users.name AS Buyer
        FROM sales INNER JOIN products ON (products.id = sales.idSale) INNER JOIN users ON (users.id = sales.userBuyer_id) 
        WHERE sales.userBuyer_id=? AND products.sold=0`,
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
