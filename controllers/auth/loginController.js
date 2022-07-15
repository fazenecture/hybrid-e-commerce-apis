const express = require("express");
const db = require("../../config/database");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// method to login
exports.login = async (req, res) => {
  const { emailId, password } = req.body;

  if (!(emailId && password)) {
    res.status(400).send("Input Missing!");
  } else {
    db.query(
      `SELECT * FROM hybridEcomm.users WHERE emailId = "${emailId}"`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.sqlMessage);
        } else {
          if (result.length === 0) {
            res.status(400).send("User Doesn't Exists!");
          } else {
            console.log(bcrypt.compareSync(password, result[0]["password"]));
            if (bcrypt.compareSync(password, result[0]["password"])) {
              const token = jwt.sign(
                {
                  id: result[0]["id"],
                  emailId,
                  type: result[0]["type"],
                },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "48h",
                }
              );
              result[0]["token"] = token;
              res.status(200).send(result);
            } else {
              res.status(400).json({
                message: "Incorrect Password",
                emailId: emailId,
              });
            }
          }
        }
      }
    );
  }
};
