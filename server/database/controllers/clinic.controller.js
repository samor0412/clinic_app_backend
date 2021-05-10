const db = require("../models");
const Clinic = db.clinic;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

async function create(attrs) {
  try {
    ['auth_id', 'email', 'clinic_name', 'phone_number', 'address'].forEach((key) => {
      if (!attrs[key]) {
        throw `${key} doesn't exist`
      }
    })
    const clinic = {
      'auth_id': attrs.auth_id,
      'email': attrs.email,
      'clinic_name': attrs.clinic_name,
      'phone': attrs.phone_number,
      'address': attrs.address,
    }
  
    var result = await Clinic.create(clinic)
    return result.dataValues
  } catch(e) {
    throw e;
  }
}

async function findByAuthId(auth_id) {
  try {
    if (!auth_id) {
      throw `auth_id doesn't exist`
    }

    const where_condition = {
      'auth_id': auth_id,
    }

    var clinic = await Clinic.findAll({where: where_condition})
    return clinic.length == 1 ? clinic[0].dataValues : null
  } catch(e) {
    throw e;
  }
}

module.exports = {
  'create': create,
  'findByAuthId': findByAuthId,
}