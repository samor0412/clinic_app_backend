const DATATABLE = {
  'AUTH': 'auth',
  'CLINIC': 'clinic',
  'CONSULTANT_RECORD': 'consultant_record',
}

const ERROR_MESSAGES = {
  INVALID_EMAIL_OR_PASSWORD: 'incorrect email or password',
  DUPLICATE_EMAIL_FOR_SIGN_UP: 'Email is already used.',

  NOT_EXIST_ACCESS_TOKEN : `access_token doesn't exist`,
  NOT_EXIST_EMAIL : `email doesn't exist`,
  NOT_EXIST_DOCTOR_NAME : `doctor_name doesn't exist`,
  NOT_EXIST_PATIENT_NAME : `patient_name doesn't exist`,
  NOT_EXIST_MEDICATION : `medication doesn't exist`,
  NOT_EXIST_DIAGNOSIS : `diagnosis doesn't exist`,
  NOT_EXIST_ADDRESS : `address doesn't exist`,
  NOT_EXIST_DATETIME : `datetime doesn't exist`,
  NOT_EXIST_HAS_FOLLOW_UP_CONSULTANT : `has_follow_up_consultant doesn't exist`,
  NOT_EXIST_PASSWORD : `password doesn't exist`,
  NOT_EXIST_CLINIC_NAME : `clinic_name doesn't exist`,
  NOT_EXIST_PHONE_NUMBER : `phone_number doesn't exist`,
  NOT_EXIST_CONSULTATION_FEE : `consultation_fee doesn't exist`,
  NOT_EXIST_CONSULTANT_RECORD_ID : `consultant_record_id  doesn't exist`,

  INVALID_EMAIL: `invalid email `,
  INVALID_DATETIME: `invalid datetime `,
  INVALID_DATETIME_BEFORE: `invalid datetime_before`,
  INVALID_DATETIME_AFTER: `invalid datetime_after`,
  INVALID_ACCESS_TOKEN: 'invalid access token',
  INVALID_PHONE_NUMBER: 'invalid phone number',
  INVALID_PASSWORD_SECURITY: 'password should have 8 or more characters',
}

module.exports = {
  'DATATABLE': DATATABLE,
  'ERROR_MESSAGES': ERROR_MESSAGES,
}