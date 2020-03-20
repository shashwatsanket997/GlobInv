const User = require("./User");

console.log(User);

User.create({
  name: "Shashwat",
  username: "abcde",
  password: "dsds",
  userType: "admin"
});

User.create({
  name: "Shashwat",
  username: "abcde",
  password: "dsds",
  userType: "admin"
});

User.create({
  name: "Shashwat",
  username: "abcde",
  password: "dsds",
  userType: "admin"
});

User.create({
  name: "Shashwat",
  username: "abcde",
  password: "dsds",
  userType: "admin"
});

console.log(User.store);

// let sampleDel = User.store[0].id;

// console.log("After Delete");

// User.delete(sampleDel);

// console.log(User.store);

// let sampleGet = User.store[0].id;

// User.getById(sampleGet)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// User.getById(sampleGet + "dsd")
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err.prepareResponse());
//   });

// console.log("Check PUT operation");

// let putD = {
//   name: "Sanket",
//   username: "shashwat",
//   password: "dsds",
//   userType: "admin",
//   id: "8c847ac3-0d5e-4895-8322-b18d5ad7d62e"
// };

// User.put(sam + "sdsd", putD)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err.prepareResponse());
//   });

// console.log(User.store);

// User.getWithPagination(1, 20).then(data => {
//   console.log(data);
// });

// User.getWithPagination(5, 20).then(data => {
//   console.log(User.store.length);
//   console.log(data);
// });

//Patch Operation Check

// let patches = [
//   {
//     op: "replace",
//     path: "/password",
//     value: "thisIsShashwat"
//   },
//   {
//     op: "add",
//     path: "/username",
//     value: "thisIsSanket"
//   },
//   {
//     op: "remove",
//     path: "/id",
//     value: null
//   }
// ];
// let sam = User.store[0].id;
// User.patch(sam, patches)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });
