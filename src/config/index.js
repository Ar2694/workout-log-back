const dotEnv = require("dotenv");


if (process.env.NODE_ENV === "dev") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT || 3002,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  DOMAIN_URL_ONE: process.env.DOMAIN_URL_ONE,
  DOMAIN_URL_TWO: process.env.DOMAIN_URL_TWO,
  DOMAIN_URL_THREE: process.env.DOMAIN_URL_THREE,
};
