const db = require("../../config/database");
require("dotenv").config();


const query = {
    getSellers: `SELECT * FROM hybridEcomm.users WHERE id = ?;`,
    getCatalogs: `SELECT * FROM hybridEcomm.catalogs WHERE sellerId = ?`,
    addCatalogs:  `INSERT INTO hybridEcomm.catalogs (catalogName, sellerId) VALUES(?,?);`,
    addProducts: `INSERT INTO hybridEcomm.products (productName, productPrice, catalogId) VALUES (?,?,?);`,

    getOrders: `SELECT * FROM hybridEcomm.orders WHERE sellerId = ?`,
    getOrderDetails: `SELECT * FROM hybridEcomm.orderDetails WHERE orderId = ?;`,
}

// Method to create a catalog
exports.createCatalog = async (req, res) => {
  const { catalogName, sellerId, catalog } = req.body;

  db.query(
    query.getSellers,[sellerId],
    (err, result3) => {
      if (err) {
        console.log(err);
        res.status(400).send(err.sqlMessage);
      } else {
        if (result3[0]["type"] === "seller") {
          db.query(
            query.getCatalogs,[sellerId],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(400).send(err.sqlMessage);
              } else {
                if (result.length !== 0) {
                  res.status(400).send("Catalog Already Exits!");
                } else {
                  db.query(
                    query.addCatalogs,[catalogName, sellerId],
                    (err, result1) => {
                      if (err) {
                        console.log(err);
                        res.status(400).send(err.sqlMessage);
                      } else {
                        const catalogId = result1["insertId"];
                        if (Array.isArray(catalog) && catalog.length) {
                          console.log(catalog);
                          catalog.forEach(function (resu, i) {
                            let productName = catalog[i]["productName"];
                            let productPrice = catalog[i]["productPrice"];
                            db.query(
                              query.addProducts ,[productName,productPrice,catalogId],
                              (err, result2) => {
                                if (err) {
                                  console.log(err);
                                  res.statu(400).send(err.sqlMessage);
                                } else {
                                  if (i === catalog.length - 1) {
                                    res.status(200).json({
                                      message: "Products Added",
                                      catalogName,
                                    });
                                  }
                                }
                              }
                            );
                          });
                        } else {
                          console.log("No Products");
                        }
                      }
                    }
                  );
                }
              }
            }
          );
        } else {
          res.status(400).send("Not Authorzied to Add Catalogs!");
        }
      }
    }
  );
};

// Add Product 
exports.AddProduct = async (req, res) => {
    const {productName, productPrice ,catalogId} = req.body;

    db.query(
        query.addProducts, [productName, productPrice, catalogId], (err, result) => {
            if(err){
                console.log(err);
                res.status(400).send(err.sqlMessage);
            } else{
                res.send(result);
            }
        }
    )

}

// Method to get Orders
exports.getOrders = async (req, res) => {
  const sellerId = req.query.sellerId;
  let allOrders = [];

  db.query(
    query.getOrders ,[sellerId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err.sqlMessage);
      } else {
        allOrders = result;
        if (Array.isArray(result) && result.length) {
          allOrders.forEach(function(resu, i) {
            db.query(
              query.getOrderDetails ,[result[i]["orderId"]],
              (err, result1) => {
                if (err) {
                  console.log(err);
                  res.send(err.sqlMessage);
                } else {
                  allOrders[i]["items"] = result1;
                  console.log("Result --> ",result1);
                  if (i === result.length - 1) {
                      console.log("Hello", i, result.length);
                    console.log("Al Orders --->>>>",allOrders);
                    res.status(200).send(allOrders);
                  }
                }
              }
            );
          });
        } else {
          res.send("No Orders!");
        }
      }
    }
  );
};
