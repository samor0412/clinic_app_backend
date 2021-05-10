const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Auth = sequelize.define("auth", {
    'id': {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    'email': {
      type: Sequelize.TEXT
    },
    'password': {
      type: Sequelize.TEXT
    },
  },
  {
    'freezeTableName': true,
    'tableName': 'auth',
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  }
  );

  return Auth;
};