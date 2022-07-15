const db = require("../../config/database");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Function to generate User & Seller Unique Id
function generateId(emailId, timestamp) {
  const email = emailId.split("@");
  const id = email[0] + timestamp;
  return id;
}


exports.register = async (req, res) => {
  const { fullName, emailId, password, type } = req.body;
  const timestamp = new Date().valueOf();

  try {
    if (!(fullName && emailId && password && type)) {
      res.status(400).send("All Input Required");
    } else {
      db.query(
        `SELECT * FROM hybridEcomm.users WHERE emailId = "${emailId}"`,
        async (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).send(err.sqlMessage);
          } else {
            if (result.length === 0) {
              var encryptedPassword = await bcrypt.hash(password, 10);
              const id = generateId(emailId, timestamp);
              db.query(
                `INSERT INTO hybridEcomm.users (id, fullName, emailId, password, type, createdAt) VALUES ("${id}", "${fullName}", "${emailId}", "${encryptedPassword}", "${type}", "${timestamp}");`,
                (err, result1) => {
                  if (err) {
                    console.log(err);
                    res.status(400).send(err.sqlMessage);
                  } else {
                    console.log("Done");
                    db.query(
                      `SELECT * FROM hybridEcomm.users WHERE emailId = "${emailId}";`,
                      (err, result3) => {
                        if (err) {
                          console.log(err);
                          res.send(err.sqlMessage);
                        } else {
                          console.log(result3);
                          const token = jwt.sign(
                            {
                              id: result3[0]["id"],
                              emailId,
                              type,
                            },
                            process.env.TOKEN_KEY,
                            {
                              expiresIn: "48h",
                            }
                          );
                          result3[0]["token"] = token;
                          res.send(...result3);
                        }
                      }
                    );
                  }
                }
              );
            } else {
              res.json({
                message: "User Already Exists!",
              });
            }
          }
        }
      );
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
