// User
const Model = require("./main").Model;
const USER_TYPE = require("../const").USER_TYPE;

let UserSchema = {
  id: {
    type: "string",
    required: false //Auto generation
  },
  name: {
    type: "string",
    required: true
  },
  username: {
    type: "string",
    required: true // Uniquess is yet to implemented
  },
  password: {
    type: "string",
    required: true
  },
  userType: {
    type: "string",
    required: true
  }
};

let User = new Model(UserSchema, "id", [], "/users", "User");

// Add some dummy Data

User.create({
  name: "User1",
  username: "shashwat",
  password: "asdf",
  userType: USER_TYPE.ADMIN
});

User.create({
  name: "User2",
  username: "sanket",
  password: "asdf",
  userType: USER_TYPE.MANAGER
});

User.create({
  name: "Shashwat Sanket",
  username: "ishu",
  password: "asdf",
  userType: USER_TYPE.MANAGER
});

User.create({
  name: "Silber",
  username: "silber",
  password: "asdf",
  userType: USER_TYPE.ADMIN
});

// Expose the user model

module.exports = User;
