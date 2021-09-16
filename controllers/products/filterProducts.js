const getDB = require("../../db");

const filterProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

   // Muestra todos los productos de una categoria (category_id)

    const { search } = req.query;

    let results;

    // param1
    if (search) {
      [results] = await connection.query(
        `
        SELECT * FROM products
        WHERE (products.name LIKE ? OR products.description LIKE ?) AND products.sold = false;`,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      console.log("No existe un producto que contenga ese término en su nombre");
    }

    const productsFiltered = results;

    let resultPlusPhotos = [];

    if (results.length > 0) {
      const ids = results.map((result) => result.id);

      const [photos] = await connection.query(`
        SELECT * FROM products_photos WHERE product_id IN (${ids.join(",")})`);

      resultPlusPhotos = results.map((result) => {
        const resultPict = photos.filter(
          (foto) => foto.idAnuncio === result.idFotoAnuncio
        );

        return {
          ...result,
          fotos: resultPict,
        };
      });
    }

    res.send({
      status: "ok",
      data: [...productsFiltered, resultPlusPhotos],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = filterProduct;
