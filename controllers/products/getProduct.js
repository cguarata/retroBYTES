const getDB = require("../../db");

const getProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    const { id: product_id } = req.params;

    const [result] = await connection.query(
      `
        SELECT products.category, products.name, products.description, products. price, products.manufact_date, products.date, products.user_id, products.reserved, products.sold
        FROM products INNER JOIN users ON (products.user_id = users.id)
        WHERE products.id=? 
        GROUP BY products.id
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

    const single = result;

    // Para mostrar las fotos que tiene el anuncio:
    const [pictures] = await connection.query(
      `
      SELECT id, photo, uploadDate FROM products_photos WHERE product_id=?;`,
      [product_id]
    );

    // Calcular media de votos
    // const [user_ranking] = await connection.query(
    //   `
    //   SELECT AVG(user_ranking.vote) AS vote
    //   FROM user_ranking 
    //   WHERE user_ranking.userSeller_id=?
    // `,
    //   [result[0].user_id]
    // );

    res.send({
      status: "ok",
      data: [ ...single, pictures] ,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getProduct;
