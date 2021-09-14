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
 await connection.query(`DROP TABLE IF EXISTS users_votes`);
 await connection.query(`DROP TABLE IF EXISTS entries_votes`);
 await connection.query(`DROP TABLE IF EXISTS entries_photos`);
 await connection.query(`DROP TABLE IF EXISTS entries`);
 await connection.query(`DROP TABLE IF EXISTS cartItems`);
 await connection.query(`DROP TABLE IF EXISTS carts`);
 await connection.query(`DROP TABLE IF EXISTS products_votes`);
 await connection.query(`DROP TABLE IF EXISTS products_photos`);
 await connection.query(`DROP TABLE IF EXISTS products`);
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
          category VARCHAR(45),
          description TEXT(500) DEFAULT NULL,
          price DECIMAL(10,2),
          place VARCHAR(100),
          manufact_date YEAR,
          user_id INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id)
       )
`)

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

  //  creo la tabla users_votes
      await connection.query(`
      CREATE TABLE users_votes (
          id INT PRIMARY KEY AUTO_INCREMENT,
          date DATETIME NOT NULL,
          vote TINYINT NOT NULL,
          user_id INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id)
 
      )
    `);


 // creo la tabla entries
      await connection.query(`
      CREATE TABLE entries (
          id INT PRIMARY KEY AUTO_INCREMENT,
          date DATETIME NOT NULL,
          place VARCHAR(1000) NOT NULL,
          description TEXT,
          user_id INT NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id)
          )
      `);

 // creo la tabla entries_votes
 await connection.query(`
     CREATE TABLE entries_votes (
         id INT PRIMARY KEY AUTO_INCREMENT,
         date DATETIME NOT NULL,
         vote TINYINT NOT NULL,
         entry_id INT NOT NULL,
         FOREIGN KEY (entry_id) REFERENCES entries(id),
         user_id INT NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id)
     )
 `);

 // creo la tabla entries_photos
 await connection.query(`
     CREATE TABLE entries_photos (
         id INT PRIMARY KEY AUTO_INCREMENT,
         uploadDate DATETIME NOT NULL,
         photo VARCHAR(50),
         entry_id INT NOT NULL,
         FOREIGN KEY (entry_id) REFERENCES entries(id)
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

// añadir productos
const now = new Date();
const date = formatDateToDB(now);

await connection.query(`
INSERT INTO products(name, manufact_date, category, price, place, user_id, date, description)
VALUES 
("IBM PC 5150", "1981","Informática", "450", "A Coruña", "${random(2, users + 1)}", "${(date)}","${faker.lorem.paragraph()}"),
("Commodore 64", "1982","Informática", "1050", "Madrid", "${random(2, users + 1)}", "${(date)}","${faker.lorem.paragraph()}"),
("Sinclair ZX Spectrum", "1982","Informática", "170", "Valencia", "${random(2, users + 1)}", "${(date)}","${faker.lorem.paragraph()}"),
("Apple II", "1982","Informática", "980", "Santiago de Compostela", "${random(2, users + 1)}", "${(date)}","${faker.lorem.paragraph()}"),
("Commodore Amiga 500", "1987","Informática", "1200", "Barcelona", "${random(2, users + 1)}" , "${(date)}","${faker.lorem.paragraph()}"),
("MITS Altair 8800", "1975","Informática", "860", "Valencia", "${random(2, users + 1)}", "${(date)}","${faker.lorem.paragraph()}")

`);



// introducir varias entradas de entries
const num_entries = 10;

for (let index = 0; index < num_entries; index++) {
const now = new Date();
await connection.query(`
INSERT INTO entries (date, place, description, user_id)
VALUES (
            "${formatDateToDB(now)}",
            "${faker.address.city()}",
            "${faker.lorem.paragraph()}",
            ${random(2, users + 1)}
)
`);
}

// introducir varias entradas de entries_votes
const num_votes = 100;

for (let index = 0; index < num_votes; index++) {
const now = new Date();
await connection.query(`
INSERT INTO entries_votes (date, vote, entry_id, user_id)
VALUES (
            "${formatDateToDB(now)}",
            "${random(1, 5)}",
            "${random(1, num_entries)}",
            ${random(2, users + 1)}
)
`);
}

// introducir varias entradas de user_votes
// const numb_votes = 100;

// for (let index = 0; index < numb_votes; index++) {
// const now = new Date();
// await connection.query(`
// INSERT INTO users_votes (date, vote)
// VALUES (
//             "${formatDateToDB(now)}",
//             "${random(1, 5)}",

// )
// `);
// }


console.log("Datos randoms introducidos");
} catch (error) {
console.error(error);
} finally {
// libero la connexion
if (connection) connection.release();
process.exit(0);
}
}

main();