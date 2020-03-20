// This file contains all the constants for this project

module.exports.PORT = 7000;
module.exports.JWT_KEY = "GiveYourBest";
module.exports.JWT_EXPIRE_TIME = "2h"; //2hrs
// An array of public Urls which do not seek authentication
module.exports.AUTH_ENDPOINT = "/auth";
module.exports.publicURLs = ["/auth"];

// Enum for UserType
module.exports.USER_TYPE = {
  ADMIN: "admin",
  MANAGER: "manager"
};
module.exports.ERROR_TYPE = {};
