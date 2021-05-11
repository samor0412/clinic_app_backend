var jwt = require('jsonwebtoken');
const fs = require('fs');
const { ERROR_MESSAGES } = require('../constants');
function _parseBoolean(data) {
  if (data === 'true' || data === true) {
    return true
  }

  if (data === 'false' || data === false) {
    return false
  }

  return null
}

async function _generateAccessToken(authData) {
  return await new Promise((resolve, reject) => {
    var privateKey = fs.readFileSync('private.key');
    jwt.sign({ ...authData }, privateKey, { algorithm: 'RS256', expiresIn: 60 * 60 * 24 * 30 }, function(err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token)
      }
    });
  })
}

async function _verifyAccessToken(token) {
  return await new Promise((resolve, reject) => {
    var privateKey = fs.readFileSync('public.key');
    jwt.verify(token, privateKey, function(err, decoded) {
      if (err) {
        reject(ERROR_MESSAGES.INVALID_ACCESS_TOKEN);
      } else {
        resolve(decoded)
      }
    });
  })
}

module.exports = {
  '_parseBoolean': _parseBoolean,
  '_generateAccessToken': _generateAccessToken,
  '_verifyAccessToken': _verifyAccessToken,
}