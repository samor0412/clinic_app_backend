var express = require('express')
var app = express()
const bodyParser = require('body-parser')
const {validationResult} = require('express-validator');
const EXPRESS_VALIDATOR = require('./expressValidator').EXPRESS_VALIDATOR
var Database = require('./database/models').Database;
const {
  Auth,
  Clinic,
  Consultant_Record,
} = require('./database/controllers');
const { auth } = require('./database/models');
const { _generateAccessToken, _verifyAccessToken } = require('./database/utils');
const ERROR_TO_MESSAGES = require('./errorToMessages');
const { ERROR_MESSAGES } = require('./constants');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/create-user', ...EXPRESS_VALIDATOR.CREATE_USER, async function (req, res) {
  try {
    validationResult(req).throw();
    const authResult = await Auth.create({
      'email': req.body.email,
      'password': req.body.password,
    })

    delete authResult.password

    const clinicResult = await Clinic.create({
      'auth_id': authResult.id,
      'email': req.body.email,
      'clinic_name': req.body.clinic_name,
      'phone_number': req.body.phone_number,
      'address': req.body.address,
    })

    const authData = {
      'auth': authResult,
      'clinic': clinicResult,
    }

    const access_token = await _generateAccessToken(authData)

    res.json({
      ...authData,
      'access_token': access_token,
    })
  } catch (e) {
    console.log(e)
    res.json(ERROR_TO_MESSAGES.createUserErrorMessage(e))
  }
})

app.get('/login', ...EXPRESS_VALIDATOR.LOGIN, async function (req, res) {
  try {
    validationResult(req).throw();
    const authResult = await Auth.findByEmail(req.body.email);
    const isPasswordCorrect = await Auth._validatePassword(req.body.password, authResult.password)

    if (!isPasswordCorrect) {
      throw 'incorrect email or password';
    }
    delete authResult.password;

    const clinicResult = await Clinic.findByAuthId(authResult.id);

    const authData = {
      'auth': authResult,
      'clinic': clinicResult,
    }

    const access_token = await _generateAccessToken(authData)

    res.json({
      ...authData,
      'access_token': access_token,
    })
  } catch (e) {
    console.log(e)
    res.json(ERROR_TO_MESSAGES.loginErrorMessage(e))
  }
})

app.post('/create-consultation', ...EXPRESS_VALIDATOR.CREATE_CONSULTATION, async function (req, res) {
  try {
    validationResult(req).throw();
    const authData = await _verifyAccessToken(req.body.access_token)
    const clinic_id = authData.clinic && authData.clinic.id;
    if (!clinic_id) {
      throw ERROR_MESSAGES.INVALID_ACCESS_TOKEN;
    }

    const result = await Consultant_Record.create({
      'clinic_id': clinic_id,
      'doctor_name': req.body.doctor_name,
      'patient_name': req.body.patient_name,
      'diagnosis': req.body.diagnosis,
      'medication': req.body.medication,
      'consultation_fee': req.body.consultation_fee,
      'datetime': req.body.datetime,
      'has_follow_up_consultant': req.body.has_follow_up_consultant,
    })

    res.json(result)
  } catch (e) {
    console.log(e)
    res.json(ERROR_TO_MESSAGES.createConsultantRecordErrorMessage(e))
  }
})


app.get('/consultation', ...EXPRESS_VALIDATOR.CONSULTATION, async function (req, res) {
  try {
    validationResult(req).throw();
    const authData = await _verifyAccessToken(req.body.access_token)
    const clinic_id = authData.clinic && authData.clinic.id;
    if (!clinic_id) {
      throw ERROR_MESSAGES.INVALID_ACCESS_TOKEN;
    }

    const result = await Consultant_Record.findByClinicIdAndConsultantRecordId({
      'clinic_id': clinic_id,
      'consultant_record_id': req.body.consultant_record_id,
    })

    res.json(result);
  } catch (e) {
    console.log(e)
    res.json(ERROR_TO_MESSAGES.getConsultantRecordErrorMessage(e))
  }
})

app.get('/consultations', ...EXPRESS_VALIDATOR.CONSULTATIONS, async function (req, res) {
  try {
    validationResult(req).throw();
    const authData = await _verifyAccessToken(req.body.access_token)
    const clinic_id = authData.clinic && authData.clinic.id;
    if (!clinic_id) {
      throw ERROR_MESSAGES.INVALID_ACCESS_TOKEN;
    }

    const result = await Consultant_Record.findAll({
      'clinic_id': clinic_id,
      'doctor_name': req.body.doctor_name,
      'patient_name': req.body.patient_name,
      'diagnosis': req.body.diagnosis,
      'medication': req.body.medication,
      'datetime': req.body.datetime,
      'datetime_before': req.body.datetime_before,
      'datetime_after': req.body.datetime_after,
    })

    res.json(result);
  } catch (e) {
    console.log(e)
    res.json(ERROR_TO_MESSAGES.getConsultantRecordsErrorMessage(e))
  }
})

app.listen('3000', () => {
  console.log(`Listening at http://localhost:3000`)
})