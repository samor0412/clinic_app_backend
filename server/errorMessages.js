function createUserErrorMessage(e) {
  if (e && e.errors && e.errors.some(error => error.type === 'unique violation' && error.path === 'email')) {
    return 'Email is already used.'
  }
  return 'Create User Failed';
}

function loginErrorMessage(e) {
  return e;
}

function createConsultantRecordErrorMessage(e) {
  return e;
}

function getConsultantRecordErrorMessage(e) {
  return e;
}

function getConsultantRecordsErrorMessage(e) {
  return e;
}

module.exports = {
  'createUserErrorMessage': createUserErrorMessage,
  'loginErrorMessage': loginErrorMessage,
  'createConsultantRecordErrorMessage': createConsultantRecordErrorMessage,
  'getConsultantRecordErrorMessage': getConsultantRecordErrorMessage,
  'getConsultantRecordsErrorMessage': getConsultantRecordsErrorMessage,
}