// importer sequelize
import { Sequelize } from "sequelize";

//lire les variable d'environnement qui son dans .env
import dotenv from "dotenv";
const ENV = dotenv.config().parsed;

// on cree la variable de connection
const connection = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: ENV.DB_DIALECT,
  // port: ENV.DB_PORT
});
export default connection;
