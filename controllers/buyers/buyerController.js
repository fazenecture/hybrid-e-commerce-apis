const db = require("../../config/database");
require("dotenv").config();

// GET all sellers
exports.sellersList = async (req, res) => {
  db.query(
    `SELECT users.id ,users.emailId, users.fullName FROM hybridEcomm.users WHERE type = "seller"`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err.sqlMessage);
      } else {
        res.send(result);
      }
    }
  );
};

// Get the catalog of a seller by sellerId
exports.getCatalog = async (req, res) => {
  const sellerId = req.params.sellerId;
  let allCatalog = [];

  db.query(
    `SELECT * FROM hybridEcomm.catalogs WHERE sellerId = "${sellerId}"`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.statu(400).send(err.sqlMessage);
      } else {
        console.log(result);
        if (Array.isArray(result) && result.length) {
          const catalogId = result[0]["catalogId"];
          allCatalog = result;
          db.query(
            `SELECT * FROM hybridEcomm.products WHERE catalogId = "${catalogId}"`,
            (err, result1) => {
              if (err) {
                console.log(err);
                res.status(400).send(err.sqlMessage);
              } else {
                console.log(result1);
                if (Array.isArray(result1) && result1.length) {
                  allCatalog[0]["Products"] = result1;
                  res.send(allCatalog);
                } else {
                  res.send("No Products in this Catalog");
                }
              }
            }
          );
        } else {
          res.status(400).send("No Catalog Found For This Seller!");
        }
      }
    }
  );
};

exports.addToCart = async (req, res) => {
  const { productId, buyerId, sellerId } = req.body;
  const timestamp = new Date().valueOf();

  db.query(
    `SELECT * FROM hybridEcomm.cart WHERE buyerId = "${buyerId}"`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err.sqlMessage);
      } else {
        db.query(
          `SELECT * FROM hybridEcomm.products WHERE productId = "${productId}";`,
          (err, result1) => {
            if (err) {
              console.log(err);
              res.status(400).send(err.sqlMessage);
            } else {
              let price = result1[0]["productPrice"];

              db.query(
                `INSERT INTO hybridEcomm.cart (productId, buyerId, sellerId, amount, addedAt) VALUES ("${productId}", "${buyerId}", "${sellerId}", "${price}", "${timestamp}");`,
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(400).send(err.sqlMessage);
                  } else {
                    res.send(result);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.createOrder = async (req, res) => {
  const sellerId = req.params.sellerId;
  const { buyerId } = req.body;
  const orderId = new Date().valueOf();
  let totalAmount = 0;

  db.query(
    `SELECT * FROM hybridEcomm.cart WHERE sellerId = "${sellerId}" AND buyerId="${buyerId}"`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err.sqlMessage);
      } else {
        console.log(result);
        if (Array.isArray(result) && result.length) {
          result.forEach(function (resu, i) {
            console.log("Hello--> ", result);
            totalAmount += result[i]["amount"];
            console.log(totalAmount);
            db.query(
              `INSERT INTO hybridEcomm.orderDetails (orderId, buyerId, sellerId ,productId) VALUES ("${orderId}", "${buyerId}", "${sellerId}", "${result[i]["productId"]}")`,
              (err, result1) => {
                if (err) {
                  console.log(err);
                  res.status(400).send(err.sqlMessage);
                } else {
                  console.log(result1);
                  if (i === result.length - 1) {
                    db.query(
                      `INSERT INTO hybridEcomm.orders (orderId, buyerId, sellerId, totalAmount) VALUES ("${orderId}", "${buyerId}", "${sellerId}", "${totalAmount}" );`,
                      (err, result2) => {
                        if (err) {
                          console.log(err);
                          res.status(400).send(err.sqlMessage);
                        } else {
                          db.query(
                            `DELETE FROM hybridEcomm.cart WHERE sellerId = "${sellerId}" AND buyerId="${buyerId}"`,
                            (err, result3) => {
                              if (err) {
                                console.log(err);
                                res.status(400).send(err.sqlMessage);
                              } else {
                                res.send("Order Created!");
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              }
            );
          });
        }
      }
    }
  );
};
