const listCategories = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Leer las categorías de la Base de Datos:
    const [results] = await connection.query(`
          SELECT products.category, products.name FROM products;
          `);

    // console.log(results);

    // Devolver un json con las categorías:
    res.send({
      status: "ok",
      data: results,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listCategories;
