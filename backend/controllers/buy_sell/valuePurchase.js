const getDB = require("../../db");
const { formatDateToDB } = require("../../helpers");

const valuePurchase = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Recojo los parámetros
    const { userBuyer_id, idSale } = req.params;
    const { vote } = req.body;

    // compruebo que el valor de votos esté en rango
    if (vote < 1 || vote > 5) {
      const error = new Error("Su valoración debe estar entre 1 y 5");
      error.httpStatus = 400;
      throw error;
    }

    // Compruebo el usuario no es el creador del producto
    const [current] = await connection.query(
      `
      SELECT userSeller_id 
      FROM user_ranking
      WHERE userBuyer_id=?
    `,
      [userBuyer_id]
    );

    if (current[0] === req.userAuth.id) {
      const error = new Error("No puedes votarte a ti mismo");
      error.httpStatus = 403;
      throw error;
    }

    // Compruebo que el usuario no votara anteriormente la compra
    const [existsRanking] = await connection.query(
      `
      SELECT id
      FROM user_ranking
      WHERE idSale=?
    `,
      [idSale]
    );

    if (existsRanking.length > 0) {
      const error = new Error("Ya valoraste esta compra anteriormente");
      error.httpStatus = 403;
      throw error;
    }

    const now = new Date();

    // Añado el voto a la tabla
    const [voto] = await connection.query(
      `
      INSERT INTO user_ranking(date_vote, idSale, vote, userSeller_id)
      VALUES(?,?,?,?)
    `,
      [formatDateToDB(now), idSale, vote, req.userAuth.id]
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
