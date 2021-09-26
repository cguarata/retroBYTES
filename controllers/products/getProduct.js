const getDB = require("../../db");

const getProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    const { id: product_id } = req.params;

    const [result] = await connection.query(
      `
      SELECT products.id, products.name, products.category, MAX(products_photos.photo) foto, products.place, products.price, products.manufact_date, user_id, AVG(IFNULL(user_ranking.vote,0)) AS votes
      FROM products
      LEFT JOIN user_ranking ON (user_ranking.userSeller_id = products.user_id)
      LEFT JOIN products_photos ON (products.id = products_photos.product_id)
      WHERE products.id=? 
    
       `,
      [product_id]
    );

    if (result.length === 0) {
      const error = new Error(
        "El producto no existe en esta nuestra plataforma."
      );
      error.httpStatus = 404;
      throw error;
    }


    res.send({
      status: "ok",
      data: result[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getProduct;
