const getDB = require("../../db");

const getProduct = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    // hacer la query con "prepared statemen" para evitar SQL injection
    const [result] = await connection.query(
      `
        SELECT products.id, products.name, products.manufact_date, products.place, products.date, products.description, products.user_id, AVG(IFNULL(products_votes.vote, 0)) AS votes
        FROM products
        LEFT JOIN products_votes ON (products.id = products_votes.product_id)
        WHERE products.id = ?
        GROUP BY products.id
       `,
      [id]
    );

    let [single] = result;

    const [photos] = await connection.query(
      `
      SELECT id, photo, uploadDate 
      FROM products_photos
      WHERE product_id = ?
    `,
      [id]
    );

    res.send({
      status: "ok",
      data: {
        ...single,
        photos,
      },
    });
  } catch (error) {
    // voy al middleware de los errores
    next(error);
  } finally {
    // libero la connexion
    if (connection) connection.release();
  }
};

module.exports = getProduct;
