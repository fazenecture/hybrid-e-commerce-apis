const express = require("express");
const db = require("../../config/database");
require("dotenv").config();

// Method to create a catalog
exports.createCatalog = async (req, res) => {
  const { catalogName, sellerId, catalog } = req.body;

  db.query(
      `SELECT * FROM hybridEcomm.users WHERE id = "${sellerId}";`, (err, result3) =>{
          if(err){
              console.log(err);
              res.status(400).send(err.sqlMessage);
          } else{
              if(result3[0]["type"] === "seller"){
                db.query(
                    `SELECT * FROM hybridEcomm.catalogs WHERE sellerId = "${sellerId}"`,
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        res.status(400).send(err.sqlMessage);
                      } else {
                        if (result.length !== 0) {
                          res.status(400).send("Catalog Already Exits!");
                        } else {
                          db.query(
                            `INSERT INTO hybridEcomm.catalogs (catalogName, sellerId) VALUES("${catalogName}", "${sellerId}")`,
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
                                      `INSERT INTO hybridEcomm.products (productName, productPrice, catalogId) VALUES ("${productName}", "${productPrice}", "${catalogId}")`,
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
                  res.status(400).send("Not Authorzied to Add Catalogs!")
              }
          }
      }
  )

};

// Method to get Orders
exports.getOrders = async (req, res) => {
    const sellerId = req.query.sellerId;
    let allOrders = [];

    db.query(
        `SELECT * FROM hybridEcomm.orders WHERE sellerId = "${sellerId}"`, (err, result) => {
            if(err){
                console.log(err);
                res.status(400).send(err.sqlMessage);
            } else {
                allOrders = result;
                if(Array.isArray(result) && result.length) {
                    result.forEach(function(resu, i){
                        db.query(
                            `SELECT * FROM hybridEcomm.orderDetails WHERE orderId = "${result[i]["orderId"]}";`, (err, result1) => {
                                if(err){
                                    console.log(err);
                                    res.send(err.sqlMessage);
                                } else {
                                    allOrders[i]['items'] = result1
                                    if(i === result.length - 1){
                                        res.status(200).send(allOrders);
                                    }
                                }
                            }
                        )
                    })
                } else {
                    res.send("No Orders!");
                }
            }
        }
    )

}