require('dotenv').config();
require('./config/database').connect();
const User = require("./model/user");
const Product = require("./model/product");
const bcrypt = require('bcrypt')
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
let http = require('http');
let fs = require('fs');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const { PORT } = process.env;
const port = process.env.PORT || PORT;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://e-comm-web-two.vercel.app');
  next();
});
const corsOptions = {
  origin: '*',
  methods:["POST","GET","PATCH","DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
const routes = require('./route/index.js')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use('/api', routes)
const swaggerJson = require('./swagger/swagger.json')
const swaggerUi = require("swagger-ui-express");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
app.use('/uploads', express.static('uploads'));

app.get('/' , (req,res) => {
  res.sendFile(__dirname + '/index.html')
})

  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}/`);
  });
