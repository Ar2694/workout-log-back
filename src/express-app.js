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

  app.use(morgan("dev"));
  // Configure CORS options

  const corsOptions = {
    origin: ["https://workout-log.arlixsorto.com"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin"],
  }

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