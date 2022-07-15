const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const cors = require("cors");

const sellerRoutes = require('./routes/sellers/sellerRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(sellerRoutes);

app.get('*', (req,res) => {
    res.status(404).send({"Message":"Route Not Found"});
});

app.listen(4000);