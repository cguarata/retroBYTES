const getDB = require("../../db");

const getProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    const { product_id } = req.params;
    const { category_id } = req.params;

    const [result] = await connection.query(
      `
        SELECT products.product_id, products.date, products.name, products.description, products.price, products.place, products.category_id, products.user_id, users.name 
        FROM products INNER JOIN products ON (users.user_id = products.user_id)
        WHERE products.products_id=? AND products.category_id=?;`,
      [product_id, category_id]
    );

    if (result.length === 0) {
      const error = new Error(
        "El producto no existe en esta categoría."
      );
      error.httpStatus = 404;
      throw error;
    }

    const single = result;

    // Para mostrar las fotos que tiene el anuncio:
    const [pictures] = await connection.query(
      `
      SELECT products_photo_id, photo, uploadDate FROM products_photos WHERE product_id=?;`,
      [idAnuncio]
    );

    // Calcular media de votos
    const [user_ranking] = await connection.query(
      `
      SELECT AVG(user_ranking.vote) AS vote
      FROM user_ranking 
      WHERE user_ranking.userSeller_id=?
    `,
      [result[0].user_id]
    );

    res.send({
      status: "ok",
      data: [ ...single, pictures, puntuacionVendedor] ,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getProduct;
