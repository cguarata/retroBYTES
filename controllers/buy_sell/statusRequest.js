const getDB = require("../../db");

const statusRequest = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    //
    const { id: product_id, idSale } = req.params;

    const [result] = await connection.query(
      `
        
        SELECT * FROM sales
        LEFT JOIN user_ranking ON(userSeller_id = user_ranking.vote) 
        WHERE product_id=?;
      
       `,
      [product_id, idSale]
    );

    res.send({
      status: "ok",
      message: "message",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = statusRequest;