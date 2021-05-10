const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Clinic = sequelize.define("clinic", {
    'id': {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    'auth_id': {
      type: Sequelize.INTEGER
    },
    'email': {
      type: Sequelize.TEXT
    },
    'clinic_name': {
      type: Sequelize.TEXT
    },
    'phone': {
      type: Sequelize.TEXT
    },
    'address': {
      type: Sequelize.TEXT
    },
  },
  {
    'freezeTableName': true,
    'tableName': 'clinic',
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  }
  );

  return Clinic;
};