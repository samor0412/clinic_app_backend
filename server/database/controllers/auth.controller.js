require('dotenv').config()
const db = require("../models");
const bcrypt = require ('bcrypt');
const Auth = db.auth;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

const {
  SALT_ROUND,
} = process.env;

async function create(attrs) {
  try {
    ['email', 'password'].forEach((key) => {
      if (!attrs[key]) {
        throw `${key} doesn't exist`
      }
    })

    const encryptedPassword = await _encryptPassword(attrs.password);
    const auth = {
      'email': attrs.email,
      'password': encryptedPassword,
    }
  
    var result = await Auth.create(auth)
    return result.dataValues
  } catch(e) {
    throw e;
  }
}

async function findByEmail(email) {
  try {
    if (!email) {
      throw `email doesn't exist`

    }

    const where_condition = {
      'email': email,
    }
    const auth = await Auth.findAll({where: where_condition});
    return auth.length == 1 ? auth[0].dataValues : null
  } catch(e) {
    throw e;
  }
}

async function _encryptPassword(password) {
  const salt = await _generateSalt(parseInt(SALT_ROUND, 10));
  return await _encryptPasswordWithSalt(password, salt);
}

async function _generateSalt(round) {
  return await bcrypt.genSaltSync(round);
}
async function _encryptPasswordWithSalt(password, salt) {
  return await bcrypt.hashSync(password, salt);    
}

async function _validatePassword(password, encyptedPassword) {
  return await bcrypt.compareSync(password, encyptedPassword)
}


module.exports = {
  'create': create,
  'findByEmail': findByEmail,
  '_validatePassword': _validatePassword,
}