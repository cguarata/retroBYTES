const getDB = require("../../db");

const voteUser = async (req, res, next) => {
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

    // el usuario no puede votar por si mismo
    const [current] = await connection.query(
      `
      SELECT user_id
      FROM users
      WHERE id=?
    `,
      [id]
    );

    if (current[0].user_id === req.userAuth.id) {
      const error = new Error("No puedes votar por ti mismo");
      error.httpStatus = 403;
      throw error;
    }

    // un usuario puede votar solo una vez
    const [existingVote] = await connection.query(
      `
      SELECT id
      FROM users_votes
      WHERE user_id=? AND user_id=? 
    `,
      [req.userAuth.id, id]
    );

    if (existingVote.length > 0) {
      const error = new Error("Ya votaste a este usuario");
      error.httpStatus = 403;
      throw error;
    }

    const now = new Date();

    // añado el voto a la tabla
    await connection.query(
      `
        INSERT INTO entries_votes (date, vote, entry_id, user_id)
        VALUES (?,?,?,?)
    `,
      [now, vote, id, req.userAuth.id]
    );

    // saco la nueva media de los votos
    const [newVotes] = await connection.query(
      `
        SELECT AVG(vote) AS media_votes
        FROM entries_votes
        WHERE entry_id = ?
        GROUP BY entry_id
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

module.exports = voteUser;
