    const getDB = require("../../db");

    const statusRequest = async (req, res, next) => {
      let connection;
      try {
        connection = await getDB();
    
        // 
        const { id: product_id, idSale} = req.params;

        const [ result ] = await connection.query(`
        
        SELECT * FROM sales
        LEFT JOIN user_ranking ON(userSeller_id = user_ranking.vote) 
        WHERE product_id=?;
      
       `,
        [product_id, idSale]
       );
    
        res.send({
          status: "ok",
          message: "message",
          data: result,
        });
      } catch (error) {
        next(error);
      } finally {
        if (connection) connection.release();
      }
    };
    
    module.exports = statusRequest;
    

  //   SELECT sales.idSale, sales.product_id, sales.status, users.name, products.name
  //   FROM sales LEFT JOIN user_ranking ON (user_ranking.idSale = sales.idSale)
  //  INNER JOIN products ON (product_id = sales.product_id)
  //  INNER JOIN users ON (user_id) WHERE sales.idSale=?




//     const { id: user_id } = req.params;

//     const [result] = await connection.query(
//       `
//       SELECT sales.idSale, sales.product_id, sales.status, users.name
//       FROM sales LEFT JOIN user_ranking ON (user_ranking.idSale = sales.idSale)
//      INNER JOIN products ON (product_id = sales.product_id)
//      INNER JOIN users ON (user_id) WHERE userBuyer_id=12 `,
//       [user_id]
//     );

//     if (result === 0) {
//       const error = new Error("No has reservado este anuncio.");
//       error.httpStatus = 403;
//       throw error;
//     }

//     res.send({
//       status: "ok",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   } finally {
//     if (connection) connection.release();
//   }
// };

// module.exports = statusRequest;