const getDB = require("../../db");
const { formatDateToDB, savePhoto, validate } = require("../../helpers.js");
const { newProductSchema } = require("../../schemas");

const newProduct = async (req, res, next) => {
  let connection;
  try {
    // creo la conexion al DB
    connection = await getDB();

    // saco los campos del body
    const { name, category, description, price, place, manufact_date } = req.body;

    //console.log(place, description);
    //console.log(req);

    // valido los datos del body
    await validate(newProductSchema, req.body);

    if (!place) {
      const error = new Error("El campo 'place' es obligatorio");
      error.httpStatus = 400;
      throw error;
    }

    const now = new Date();

    // hacemos la insert en la BD
    const [result] = await connection.query(
      `
      INSERT INTO products (date, name, category, description, price, place, manufact_date, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [formatDateToDB(now), name, category, description, price, place, manufact_date, req.userAuth.id]
    );

    // saco el id de la fila insertada
    const { insertId } = result;

    // proceso las imagenes
    const photos = [];

    if (req.files && Object.keys(req.files).length > 0) {
      // hay imagenes!!!!!!
      for (const photoData of Object.values(req.files).slice(0, 3)) {
        //console.log(photoData);
        const nombrePhoto = await savePhoto(photoData);
        photos.push(nombrePhoto);

        // hacer una INSERT en el DB de las fotos para la entry "insertId"
        await connection.query(
          `
                INSERT INTO products_photos (uploadDate, photo, product_id)
                VALUES (?, ?, ? )
          `,
          [formatDateToDB(now), nombrePhoto, insertId]
        );
      }
    }

    res.send({
      status: "ok",
      data: {
        id: insertId,
        name,
        price,
        place,
        category,
        description,
        manufact_date,
        user_id: req.userAuth.id,
        date: now,
        votes: 0,
        fotos: photos,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newProduct;
