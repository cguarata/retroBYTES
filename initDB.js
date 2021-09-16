require("dotenv").config();
const faker = require("faker");
const getDB = require("./db");
const { formatDateToDB } = require("./helpers");
const { random } = require("lodash");

let connection;

async function main() {
  try {
    connection = await getDB();

    // borrar las tablas existentes
    await connection.query(`DROP TABLE IF EXISTS user_ranking`);
    await connection.query(`DROP TABLE IF EXISTS sales`);
    await connection.query(`DROP TABLE IF EXISTS products_photos`);
    await connection.query(`DROP TABLE IF EXISTS products`);
    await connection.query(`DROP TABLE IF EXISTS categories`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log("Tablas borradas");

    // creo la tabla usuarios
    await connection.query(`
   CREATE TABLE users (
       id INT PRIMARY KEY AUTO_INCREMENT,
       date DATETIME NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(512) NOT NULL,
       name VARCHAR(100),
       avatar VARCHAR(50),
       active BOOLEAN DEFAULT false,
       role ENUM("admin","normal") DEFAULT "normal" NOT NULL,
       registrationCode VARCHAR(100),
       deleted BOOLEAN DEFAULT false,
       lastAuthUpdate DATETIME,
       recoverCode varchar(100)
       )
 `);

    // creo la tabla products
    await connection.query(`
      CREATE TABLE products (
          id INT PRIMARY KEY AUTO_INCREMENT,
          date DATETIME NOT NULL,
          name VARCHAR(45),
          description TEXT(500) DEFAULT NULL,
          price DECIMAL(10,2),
          place VARCHAR(100),
          manufact_date YEAR,
          user_id INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id),
          category ENUM('Informática','Telefonía','Gaming','Video','Audio', 'Memorabilia') NOT NULL,
          reserved BOOLEAN DEFAULT false,
          sold BOOLEAN DEFAULT false
       )
`);

    // creo la tabla products_photos
    await connection.query(`
      CREATE TABLE products_photos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uploadDate DATETIME NOT NULL,
        photo VARCHAR(50),
        product_id INT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id)
        )
   `);

    // creo la tabla de ventas
    await connection.query(` 
      CREATE TABLE sales (
        idSale INT PRIMARY KEY AUTO_INCREMENT,
        userBuyer_id INT NOT NULL,
        FOREIGN KEY (userBuyer_id) REFERENCES users(id),
        product_id INT NOT NULL,   
        FOREIGN KEY (product_id) REFERENCES products(id),
        status BOOLEAN,
        timeDelivery DATETIME,
        placeDelivery VARCHAR(300)
  
      );

`);

    // creo la tabla de valoración de usuario
    await connection.query(`
    CREATE TABLE user_ranking(
      id INT PRIMARY KEY AUTO_INCREMENT,
      date_vote DATETIME,
      userSeller_id INT NOT NULL,
      FOREIGN KEY (userSeller_id) REFERENCES users(id),
      idSale INT NOT NULL,
      FOREIGN KEY (idSale) REFERENCES sales(idSale),
      vote TINYINT DEFAULT 0
      
    )
`);

    console.log("Tablas creadas");

    //  añado el usuario admin
    await connection.query(`
     INSERT INTO users(date, email, password, name, active, role)
     VALUES (
       "${formatDateToDB(new Date())}", 
       "cguarata1@gmail.com",
       SHA2("${process.env.ADMIN_PASSWORD}", 512),
       "Carlos Guarata", 
       true, 
       "admin");
 `);

    //generamos usuarios random
    const users = 10;

    for (let index = 0; index < users; index++) {
      const email = faker.internet.email();
      const password = faker.internet.password();
      const nombre = faker.name.findName();

      await connection.query(`
     INSERT INTO users(date,email,password,name,active)
     VALUES (
       "${formatDateToDB(new Date())}",
       "${email}",
       SHA2("${password}", 512),
       "${nombre}",
       true
     )
     `);
    }

    console.log("Ingresadas categorías");

    // añadir productos
    const now = new Date();
    const date = formatDateToDB(now);

    await connection.query(`
    INSERT INTO products(name, manufact_date, price, place, category, user_id, date, description)
    VALUES 
    ("IBM PC 5150", "1981", "450", "A Coruña", "Informática","${random(
      2,
      users + 1
    )}", "${date}","${faker.lorem.paragraph()}"),
    ("Commodore 64", "1982","1050", "Madrid", "Informática","${random(
      2,
      users + 1
    )}", "${date}","${faker.lorem.paragraph()}"),
    ("Sinclair ZX Spectrum", "1982","170", "Valencia","Informática", "${random(
      2,
      users + 1
    )}", "${date}","${faker.lorem.paragraph()}"),
    ("Apple II", "1982","980", "Santiago de Compostela","Informática", "${random(
      2,
      users + 1
    )}", "${date}","${faker.lorem.paragraph()}"),
    ("Commodore Amiga 500", "1987", "1200", "Barcelona","Informática", "${random(
      2,
      users + 1
    )}" , "${date}","${faker.lorem.paragraph()}"),
    ("MITS Altair 8800", "1975","860", "Valencia", "Informática","${random(
      2,
      users + 1
    )}", "${date}","${faker.lorem.paragraph()}")
   
    `);

    console.log("Datos randoms introducidos");
  } catch (error) {
    console.error(error);
  } finally {
    // libero la conexión
    if (connection) connection.release();
    process.exit(0);
  }
}

main();
