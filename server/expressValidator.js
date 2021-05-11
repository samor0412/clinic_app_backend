const { body, oneOf } = require('express-validator/check')
const { ERROR_MESSAGES } = require('./constants')

const EXPRESS_VALIDATOR = {
  'CREATE_USER': [
    body('email').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_EMAIL).isEmail().withMessage(ERROR_MESSAGES.INVALID_EMAIL),
    body('password').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_PASSWORD).isLength({min: 8}).withMessage(ERROR_MESSAGES.INVALID_PASSWORD_SECURITY),
    body('clinic_name').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_CLINIC_NAME),
    body('phone_number').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_PHONE_NUMBER).isMobilePhone().withMessage(ERROR_MESSAGES.INVALID_PHONE_NUMBER),
    body('address').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_ADDRESS),
  ],
  'LOGIN': [
    body('email').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_EMAIL).isEmail().withMessage(ERROR_MESSAGES.INVALID_EMAIL),
    body('password').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_PASSWORD).isLength({min: 8}).withMessage(ERROR_MESSAGES.INVALID_PASSWORD_SECURITY),
  ],
  'CREATE_CONSULTATION': [
    body('access_token').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_ACCESS_TOKEN),
    body('doctor_name').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_DOCTOR_NAME),
    body('patient_name').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_PATIENT_NAME),
    body('diagnosis').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_DIAGNOSIS),
    body('medication').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_MEDICATION),
    body('consultation_fee').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_CONSULTATION_FEE),
    body('datetime').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_DATETIME).matches(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})*$/).withMessage(ERROR_MESSAGES.INVALID_DATETIME),
    body('has_follow_up_consultant').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_HAS_FOLLOW_UP_CONSULTANT),
  ],
  'CONSULTATION': [
    body('access_token').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_ACCESS_TOKEN),
    body('consultant_record_id').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_CONSULTANT_RECORD_ID),
  ],
  'CONSULTATIONS': [
    body('access_token').exists().withMessage(ERROR_MESSAGES.NOT_EXIST_ACCESS_TOKEN),
    body('doctor_name').optional(),
    body('patient_name').optional(),
    body('diagnosis').optional(),
    body('medication').optional(),
    body('consultation_fee').optional(),
    body('datetime').optional().matches(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})*$/).withMessage(ERROR_MESSAGES.INVALID_DATETIME),
    body('datetime_before').optional().matches(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})*$/).withMessage(ERROR_MESSAGES.INVALID_DATETIME_BEFORE),
    body('datetime_after').optional().matches(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})*$/).withMessage(ERROR_MESSAGES.INVALID_DATETIME_AFTER),
    body('has_follow_up_consultant').optional(),
  ]
}

module.exports = {
  'EXPRESS_VALIDATOR': EXPRESS_VALIDATOR,
}