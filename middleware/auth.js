const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        return res.status(400).send("Token is required for Authentication!");
    } else {

        try{
            const decode = jwt.verify(token, config.TOKEN_KEY);
            req.user = decode;
            console.log(decode);
        }catch(err){
            return res.status(400).send("Invalid Token Id!");
        } 
        res.header('Access-Control-Allow-Origin', "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With", 'Content-Type','x-access-token');                      
        return next();

    }
};

module.exports = verifyToken;