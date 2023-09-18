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
const corsOptions = {
  origin: 'https://e-comm-web-mu.vercel.app',
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true,
};
const { PORT } = process.env;
const port = process.env.PORT || PORT;
const routes = require('./route/index.js')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});
app.use('/api' ,routes)
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
