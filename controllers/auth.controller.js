const { validationResult } = require("express-validator");
const authService = require("../services/auth.services");
const getAuthToken = require("../utils/util").getToken;
const ValidationError = require("../utils/Errors").ValidationError;

module.exports.authenticate = async (req, res, next) => {
  // Validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let userObj = await authService.authenticate(req.body);
    //Create the JWT token for the user
    let token = await getAuthToken(userObj);
    return res.status(200).json({
      token: token
    });
  } catch (err) {
    //Simpy pass the error to express error handler
    next(err);
  }
};
