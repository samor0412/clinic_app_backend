const { ERROR_MESSAGES } = require("./constants");

function createUserErrorMessage(e) {
  if (_getExpressValidatorError(e)) {
    return {error: _getExpressValidatorError(e)};
  }
  if (e && e.errors && e.errors.some(error => error.type === 'unique violation' && error.path === 'email')) {
    return {error: ERROR_MESSAGES.DUPLICATE_EMAIL_FOR_SIGN_UP}
  }
  return {error: 'Create User Failed'};
}

function loginErrorMessage(e) {
  if (_getExpressValidatorError(e)) {
    return {error: _getExpressValidatorError(e)};
  }
  if (ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD === e) {
    return {error: ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD};
  }
  return {error: 'Login Failed.'};
}

function createConsultantRecordErrorMessage(e) {
  if (_getExpressValidatorError(e)) {
    return {error: _getExpressValidatorError(e)};
  }
  if (ERROR_MESSAGES.INVALID_ACCESS_TOKEN === e) {
    return {error: ERROR_MESSAGES.INVALID_ACCESS_TOKEN};
  }
  return {error: 'Create Consultant Record Failed'};
}

function getConsultantRecordErrorMessage(e) {
  if (_getExpressValidatorError(e)) {
    return {error: _getExpressValidatorError(e)};
  }
  if (ERROR_MESSAGES.INVALID_ACCESS_TOKEN === e) {
    return {error: ERROR_MESSAGES.INVALID_ACCESS_TOKEN};
  }
  return {error: 'Get Consultant Record Failed'};
}

function getConsultantRecordsErrorMessage(e) {
  if (_getExpressValidatorError(e)) {
    return {error: _getExpressValidatorError(e)};
  }
  if (ERROR_MESSAGES.INVALID_ACCESS_TOKEN === e) {
    return {error: ERROR_MESSAGES.INVALID_ACCESS_TOKEN};
  }
  return {error: 'Get Consultant Records Failed'};
}

function _getExpressValidatorError(e) {
  if (e && e.formatter && e.errors) {
    return e.errors.map((error) => error.msg).join(', ');
  }
  return false;
}

module.exports = {
  'createUserErrorMessage': createUserErrorMessage,
  'loginErrorMessage': loginErrorMessage,
  'createConsultantRecordErrorMessage': createConsultantRecordErrorMessage,
  'getConsultantRecordErrorMessage': getConsultantRecordErrorMessage,
  'getConsultantRecordsErrorMessage': getConsultantRecordsErrorMessage,
}