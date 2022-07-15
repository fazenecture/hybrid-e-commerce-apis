const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const cors = require("cors");

const sellerRoutes = require('./routes/sellers/sellerRoutes');
const buyerRoutes = require('./routes/buyers/buyerRoutes');
const authRoutes = require('./routes/auth/authRoutes');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());


app.use(authRoutes);
app.use(sellerRoutes);
app.use(buyerRoutes);


app.get('*', (req,res) => {
    res.status(404).send({"Message":"Route Not Found"});
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
  });