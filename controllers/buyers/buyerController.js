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
        `SELECT * FROM hybridEcomm.catalogs WHERE sellerId = "${sellerId}"`, (err, result) => {
            if(err){
                console.log(err);
                res.statu(400).send(err.sqlMessage);
            } else {
                console.log(result);
                if(Array.isArray(result) && result.length){
                    const catalogId = result[0]["catalogId"];
                    allCatalog = result;
                    db.query(
                        `SELECT * FROM hybridEcomm.products WHERE catalogId = "${catalogId}"`, (err, result1) => {
                            if(err){
                                console.log(err);
                                res.status(400).send(err.sqlMessage);
                            } else {
                                console.log(result1)
                                if(Array.isArray(result1) && result1.length){
                                    allCatalog[0]['Products'] = result1;
                                    res.send(allCatalog);
                                } else {
                                    res.send("No Products in this Catalog");
                                }
                            }
                        }
                    )
                } else {
                    res.status(400).send("No Catalog Found For This Seller!")
                }

            }
        }
    )


}
