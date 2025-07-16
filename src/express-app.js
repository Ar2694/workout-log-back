const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { workout, exercises, schedule } = require('src/api');
const HandleErrors = require('./utils/error-handler')
const router = express.Router();
var path = require('path');

module.exports = async (app) => {
  // view engine setup
  app.set('views', "src/views");
  app.set('view engine', 'ejs');
  app.use(express.static("src/public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan("dev"))
// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:4173/', // Replace with the actual URL of your client application

        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
      credentials: true, // Allow cookies and authentication headers to be sent
      optionsSuccessStatus: 204 // For preflight requests
};

// Use the cors middleware with specific origin
app.use(cors(corsOptions));
  //api
  workout("/api", app);
  schedule("/api", app);
  exercises("/api", app);

  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
  app.use('/', router)
  // error handling
  app.use(HandleErrors);

}