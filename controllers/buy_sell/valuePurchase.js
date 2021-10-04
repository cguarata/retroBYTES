const getDB = require("../../db");
const { formatDateToDB } = require("../../helpers");

const valuePurchase = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Recojo los parámetros
    const { idSale } = req.params;
    const { vote } = req.body;

    // compruebo que el valor de votos esté en rango
    if (vote < 1 || vote > 5) {
      const error = new Error("Su valoración debe estar entre 1 y 5");
      error.httpStatus = 400;
      throw error;
    }

    // Compruebo que el usuario no votara anteriormente la compra
    const [voteSale] = await connection.query(
      `
      SELECT vote
      FROM user_ranking
      WHERE idSale=?
    `,
      [idSale]
    );

    if (voteSale.length > 0) {
      const error = new Error("Ya valoraste esta compra anteriormente");
      error.httpStatus = 403;
      throw error;
    }

    const [userSellerResults] = await connection.query(
      `
        SELECT p.user_id 
        FROM products p
        LEFT JOIN sales s ON (p.id = s.product_id)
        WHERE s.idSale =?
      `,
      [idSale]
    );

    console.log(userSellerResults);

    const now = new Date();

    // Añado el voto a la tabla
    const [voto] = await connection.query(
      `
      INSERT INTO user_ranking(date_vote, idSale, vote, userSeller_id)
      VALUES(?,?,?,?)
    `,
      [formatDateToDB(now), idSale, vote, userSellerResults[0].user_id]
    );

    res.send({
      status: "ok",
      data: {
        votes: voto.insertedId,
        vote: vote,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = valuePurchase;
