require('dotenv').config()

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_DIALECT,
} = process.env;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.auth = require("./auth.model")(sequelize, Sequelize);
db.clinic = require("./clinic.model")(sequelize, Sequelize);
db.consultant_record = require("./consultant_record.model")(sequelize, Sequelize);

module.exports = db;