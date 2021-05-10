const db = require("../models");
const ConsultantRecord = db.consultant_record;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const {
  _parseBoolean,
} = require('../utils');

async function create(attrs) {
  try {
    if (!attrs.clinic_id) {
      throw 'clinic_id doesn\'t exist';
    }
    const consultant_record = {
      'clinic_id': attrs.clinic_id,
      'doctor_name': attrs.doctor_name,
      'patient_name': attrs.patient_name,
      'diagnosis': attrs.diagnosis,
      'medication': attrs.medication,
      'consultation_fee': attrs.consultation_fee,
      'datetime': attrs.datetime,
      'has_follow_up_consultant': _parseBoolean(attrs.has_follow_up_consultant),
    }
  
    var result = await ConsultantRecord.create(consultant_record)
    return result.dataValues
  } catch(e) {
    throw e;
  }
}

async function findByClinicIdAndConsultantRecordId(attrs) {
  try {
    if (!attrs.clinic_id) {
      throw 'clinic_id doesn\'t exist';
    }
    if (!attrs.consultant_record_id) {
      throw 'consultant_record_id doesn\'t exist';
    }

    var where_condition = _buildFindWhereClause(attrs)
    var results = await ConsultantRecord.findAll({where: where_condition})
    return results.length === 1 ? results[0].dataValues : null
  } catch(e) {
    throw e;
  }
}

async function findAll(attrs) {
  try {
    if (!attrs.clinic_id) {
      throw 'clinic_id doesn\'t exist';
    }

    var where_condition = _buildFindAllWhereClause(attrs)
    var results = await ConsultantRecord.findAll({where: where_condition})
    return results.map(result => result.dataValues)
  } catch(e) {
    throw e;
  }
}

function _buildFindWhereClause(attrs) {
  var condition = {
    [Op.and]: [
      {id: attrs.consultant_record_id},
      {clinic_id: attrs.clinic_id},
    ]
  }
  return condition;
}

function _buildFindAllWhereClause(attrs) {
  var condition = {
    [Op.and]: [
      {clinic_id: attrs.clinic_id},
    ]
  }

  if (attrs.doctor_name) {
    condition[Op.and].push(
      sequelize.where(
        sequelize.fn('lower', sequelize.col('doctor_name')), 
        {[Op.like]: sequelize.fn('lower', `%${attrs.doctor_name}%`)}
      )
    )
  }

  if (attrs.patient_name) {
    condition[Op.and].push(
      sequelize.where(
        sequelize.fn('lower', sequelize.col('patient_name')), 
        {[Op.like]: sequelize.fn('lower', `%${attrs.patient_name}%`)}
      )
    )
  }

  if (attrs.diagnosis) {
    condition[Op.and].push(
      sequelize.where(
        sequelize.fn('lower', sequelize.col('diagnosis')), 
        {[Op.like]: sequelize.fn('lower', `%${attrs.diagnosis}%`)}
      )
    )
  }

  if (attrs.medication) {
    condition[Op.and].push(
      sequelize.where(
        sequelize.fn('lower', sequelize.col('medication')), 
        {[Op.like]: sequelize.fn('lower', `%${attrs.medication}%`)}
      )
    )
  }

  condition[Op.and].datatime = {
    ...(attrs.datetime ? {[Op.eq]: `${attrs.datetime}`} : {}),
    ...(attrs.datetime_before ? {[Op.lte]: `${attrs.datetime_before}`} : {}),
    ...(attrs.datetime_after ? {[Op.gte]: `${attrs.datetime_after}`} : {}),
  }

  return condition;
}

module.exports = {
  'create': create,
  'findByClinicIdAndConsultantRecordId': findByClinicIdAndConsultantRecordId,
  'findAll': findAll,
}