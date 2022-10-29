var http = require("http");

const express = require('express');
const engines = require('consolidate');
const app = express();

//body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

//npm i handlebars consolidate --save
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

//public dir 
var publicDir = require('path').join(__dirname, '/public');
app.use('/',express.static(publicDir));

//setting controller
var productController = require('./product.js');
app.use('/', productController);
//app.use('/product', productController);s

//localhost port 3000; 
const PORT = process.env.PORT || 3000;
app.listen(PORT)
