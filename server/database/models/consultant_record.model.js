const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Consultant_Record = sequelize.define("consultant_record", {
    'id': {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    'clinic_id': {
      type: Sequelize.INTEGER
    },
    'doctor_name': {
      type: Sequelize.TEXT
    },
    'patient_name': {
      type: Sequelize.TEXT
    },
    'diagnosis': {
      type: Sequelize.TEXT
    },
    'medication': {
      type: Sequelize.TEXT
    },
    'consultation_fee': {
      type: Sequelize.INTEGER
    },
    'datetime': {
      type: Sequelize.TIME
    },
    'has_follow_up_consultant': {
      type: Sequelize.BOOLEAN
    },
  },
  {
    'freezeTableName': true,
    'tableName': 'consultant_record',
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  }
  );

  return Consultant_Record;
};