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

  app.use(morgan("combined"));
  // Configure CORS options

  //api
  workout("/api", app);
  schedule("/api", app);
  exercises("/api", app);

  const corsOptions = {
    origin: ["https://workout-log.arlixsorto.com", "http://localhost:4173", "http://localhost:5173"],
  }

const allowedOrigins = [
  "https://workout-log.arlixsorto.com",
  "http://localhost:4173",
  "http://localhost:5173"
];

const corsOptionsMultiple = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // !origin allows requests from same origin (e.g., Postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptionsMultiple));

  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.use('/', router)
  // error handling
  app.use(HandleErrors);

}