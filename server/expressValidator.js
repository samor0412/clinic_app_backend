const { body, oneOf } = require('express-validator/check')

const EXPRESS_VALIDATOR = {
  'CREATE_USER': [
    body('email', 'Invalid email').exists().isEmail(),
    body('password', 'password doesn\'t exists').exists(),
    body('clinic_name', 'clinic_name doesn\'t exists').exists(),
    body('phone_number', 'phone_number doesn\'t exists').exists().isMobilePhone(),
    body('address', 'address doesn\'t exists').exists(),
  ],
  'LOGIN': [
    body('email', 'Invalid email').exists().isEmail(),
    body('password', 'password doesn\'t exists').exists(),
  ],
  'CREATE_CONSULTATION': [
    body('access_token', 'access_token doesn\'t exists').exists(),
    body('doctor_name', 'doctor_name doesn\'t exists').exists(),
    body('patient_name', 'patient_name doesn\'t exists').exists(),
    body('diagnosis', 'diagnosis doesn\'t exists').exists(),
    body('medication', 'medication doesn\'t exists').exists(),
    body('consultation_fee', 'address doesn\'t exists').exists(),
    body('datetime', 'datetime doesn\'t exists').exists(),
    body('has_follow_up_consultant', 'has_follow_up_consultant doesn\'t exists').exists().isBoolean(),
    body('access_token').exists(),
  ],
  'CONSULTATION': [
    body('access_token', 'access_token doesn\'t exists').exists(),
    body('consultant_record_id', 'consultant_record_id doesn\'t exists').exists(),
  ],
  'CONSULTATIONS': [
    body('access_token', 'access_token doesn\'t exists').exists(),
    body('doctor_name').optional(),
    body('patient_name').optional(),
    body('diagnosis').optional(),
    body('medication').optional(),
    body('consultation_fee').optional(),
    body('datetime').optional(),
    body('datetime_before').optional(),
    body('datetime_after').optional(),
    body('has_follow_up_consultant').optional(),
  ]
}

module.exports = {
  'EXPRESS_VALIDATOR': EXPRESS_VALIDATOR,
}