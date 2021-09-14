const getDB = require("../../db");

const voteProduct = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();
    const { id } = req.params;
    const { vote } = req.body;

    if (vote < 1 || vote > 5) {
      const error = new Error("El voto tiene que ser un valor entre 1 y 5");
      error.httpStatus = 400;
      throw error;
    }

    // no puede votar el usuario que la creó
    const [current] = await connection.query(
      `
      SELECT user_id
      FROM products
      WHERE id=?
    `,
      [id]
    );

    if (current[0].user_id === req.userAuth.id) {
      const error = new Error("No puedes votar tu propio producto");
      error.httpStatus = 403;
      throw error;
    }

    // un usuario puede votar solo una vez
    const [existingVote] = await connection.query(
      `
      SELECT id
      FROM products_votes
      WHERE user_id=? AND product_id=? 
    `,
      [req.userAuth.id, id]
    );

    if (existingVote.length > 0) {
      const error = new Error("Ya votaste este producto");
      error.httpStatus = 403;
      throw error;
    }

    const now = new Date();

    // añado el voto a la tabla
    await connection.query(
      `
        INSERT INTO products_votes (date, vote, product_id, user_id)
        VALUES (?,?,?,?)
    `,
      [now, vote, id, req.userAuth.id]
    );

    // saco la nueva media de los votos
    const [newVotes] = await connection.query(
      `
        SELECT AVG(vote) AS media_votes
        FROM products_votes
        WHERE product_id = ?
        GROUP BY product_id
    `,
      [id]
    );

    console.log(newVotes);

    res.send({
      status: "ok",
      data: {
        votes: newVotes[0].media_votes,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = voteProduct;
