const getDB = require("../../db");
const { deletePhoto } = require("../../helpers");

const deleteProduct = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    const { id } = req.params;

    // Seleciono las fotos relacionadas con este ID
    const [photos] = await connection.query(
      `
      SELECT photo FROM products_photos WHERE product_id=?
    `,
      [id]
    );

    // borro las tuplas en la tabla entries_photos
    await connection.query(
      `
      DELETE FROM products_photos WHERE product_id=?
    `,
      [id]
    );

    // borro las immagenes desde el disco
    for (const photo of photos) {
      console.log(photo.photo);
      await deletePhoto(photo.photo);
    }

    // borro los votos
    await connection.query(
      `
      DELETE FROM products_votes WHERE product_id=?
    `,
      [id]
    );

    // borro la entry!!!!!
    await connection.query(
      `
      DELETE FROM products WHERE id=?
    `,
      [id]
    );

    res.send({
      status: "ok",
      message: `El producto con id=${id} y todos sus elementos relacionados fueron borrados`,
    });
  } catch (error) {
    // voy al middleware de los errores
    next(error);
  } finally {
    // libero la connexion
    if (connection) connection.release();
  }
};

module.exports = deleteProduct;
