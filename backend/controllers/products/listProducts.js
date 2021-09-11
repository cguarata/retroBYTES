const getDB = require("../../db");

const listProducts = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    // saco el query string
    const { search, order, direction } = req.query;

    const validOrders = [ "place", "date", "votes"];
    const orderBy = validOrders.includes(order) ? order : "votes";

    const validDirections = ["ASC", "DESC"];
    const orderDirection = validDirections.includes(direction)
      ? direction
      : "ASC";

    let results;

    if (search) {
      [results] = await connection.query(
        `
                SELECT products.id, products.name, products.date, products.user_id, AVG(IFNULL(products_votes.vote, 0)) AS votes
                FROM products
                LEFT JOIN products_votes ON (products.id = products_votes.product_id)
                WHERE products.place LIKE ? OR products.description LIKE ? 
                GROUP BY products.id
                ORDER BY ${orderBy} ${orderDirection}
              `,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      [results] = await connection.query(`
                SELECT products.id, products.name, products.manufact_date, products.description, products.place, products.user_id, products.date, AVG(IFNULL(products_votes.vote, 0)) AS votes
                FROM products
                LEFT JOIN products_votes ON (products.id = products_votes.Product_id)
                GROUP BY products.id
                ORDER BY ${orderBy} ${orderDirection}
              `);
    }

    let resultsWithPhotos = [];

    if (results.length > 0) {
      // Saco las ids de los resultados
      const ids = results.map((result) => result.id);

      // Selecciono todas las fotos que tengan como entrada relacionada una con una id de los resultados anteriores
      const [photos] = await connection.query(
        `SELECT * FROM products_photos WHERE product_id IN (${ids.join(",")})`
      );

      // Junto el array de fotos resultante en la query anterior con los resultados
      resultsWithPhotos = results.map((result) => {
        // Fotos correspondientes al resultado (si hay, si no un array vacío)
        const resultPhotos = photos.filter(
          (photo) => photo.Product_id === result.id
        );

        // Devuelvo el resultado + el array de fotos
        return {
          ...result,
          photos: resultPhotos,
        };
      });
    }

    // Devuelvo un json con las entradas
    res.send({
      status: "ok",
      data: resultsWithPhotos,
    });
  } catch (error) {
    // voy al middleware de los errores
    next(error);
  } finally {
    // libero la connexion
    if (connection) connection.release();
    // ERROR!!! no puedo salir del proceso como en initDB!!!
    //process.exit(0);
  }
};

module.exports = listProducts;
