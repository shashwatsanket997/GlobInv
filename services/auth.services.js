const User = require("../models/User");
const ValidationError = require("../utils/Errors").ValidationError;

module.exports.authenticate = ({ username, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userObj = await User.filterStore({ username, password });
      if (userObj.length) {
        userObj = userObj[0];
        //remove password
        delete userObj[password];
        resolve(userObj);
      } else {
        reject(
          new ValidationError(
            "Invalid Credentials",
            ["username or password invalid"],
            401
          )
        );
      }
    } catch (err) {
      reject(err);
    }
  });
};
