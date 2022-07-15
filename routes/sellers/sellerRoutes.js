const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../../config/database');

const app = express();
const router = express.Router();


router.post('/api/auth/register', async(req,res) => {

    const { fullName, emailId, password, type } = req.body;
    const timestamp = new Date().valueOf();
    
    
    try{
        if(!(fullName && emailId && password && type)){
            res.status(400).send("All Input Required");
        } else {
            var encryptedPassword = await bcrypt.hash(password, 10);
            db.query(
                `INSERT INTO hybridEcomm.users (id, fullName, emailId, password, type, createdAt) VALUES ("hellowrld", "${fullName}", "${emailId}", "${encryptedPassword}", "${type}", "${timestamp}");`, (err, result) => {
                    if(err){
                        console.log(err);
                        res.status(400).send(err.sqlMessage);
                    } else {
                        console.log("Done");
                        res.send(result);
                    }
                }
            )
            
            
        }

    }catch(err){
        res.status(400).send(err);
    }



});


module.exports = router;


