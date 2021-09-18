const getDB = require("../../db");

const listProducts = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // saco el query string
    const { search, order, direction } = req.query;

    const validOrders = ["name","place","category", "price", "votes"];
    const orderBy = validOrders.includes(order) ? order : "votes";

    const validDirections = ["ASC", "DESC"];
    const orderDirection = validDirections.includes(direction)
      ? direction
      : "ASC";

    let results;


    if (search){
      [result] = await connection.query(`
      SELECT products.id, products.name, products.category, products.place, products.price, products.manufact_date, user_id, AVG(IFNULL(user_ranking.vote,0)) AS votes
      FROM products
      LEFT JOIN user_ranking ON (user_ranking.userSeller_id = user_ranking.vote)
      WHERE products.place LIKE ? OR products.description LIKE ? OR products.category LIKE ? OR products.name LIKE ?
      GROUP BY products.id
      ORDER BY ${orderBy} ${orderDirection}
      `,
      [`%${search}%`, `%${search}%`,`%${search}%`, `%${search}%`, `%${search}%` ]
      );
 
      
    } else {
      [result] = await connection.query(`
            SELECT products.name, products.category, products.place, products.price, products.manufact_date, user_id, AVG(IFNULL(user_ranking.vote,0)) AS votes
            FROM products
            LEFT JOIN user_ranking ON (user_ranking.userSeller_id = user_ranking.vote)
            GROUP BY products.id
            ORDER BY ${orderBy} ${orderDirection}
            `);

    }
    // [result] = await connection.query(`
    //         SELECT * FROM products
    //         `);

    // console.log(result);

    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    // voy al middleware de los errores
    next(error);
  } finally {
    // libero la connexion
    if (connection) connection.release();
    process.exit(0);
  }
};

module.exports = listProducts;
