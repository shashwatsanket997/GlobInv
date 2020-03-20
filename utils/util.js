const jwt = require("jsonwebtoken");
const cnst = require("../const");
const AuthorizationError = require("./Errors").AuthorizationError;

// UUID creator

function uuidGenerator() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Token Genrator and And Validator
let getToken = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      cnst.JWT_KEY,
      {
        expiresIn: cnst.JWT_EXPIRE_TIME
      },
      (err, token) => {
        if (!err) {
          resolve(token);
        } else {
          reject(new CustomError(err, 500));
        }
      }
    );
  });
};

let verifyToken = token => {
  try {
    token = token.split(" ");
    if (token.length == 2 && token[0] === "Bearer") {
      token = token[1];
    } else {
      throw new Error();
    }
    let decodedObj = jwt.verify(token, cnst.JWT_KEY);
    return decodedObj;
  } catch (err) {
    throw new AuthorizationError();
  }
};

module.exports.getToken = getToken;
module.exports.verifyToken = verifyToken;
module.exports.uuidGenerator = uuidGenerator;
