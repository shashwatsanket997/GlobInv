const { check, param } = require("express-validator");
const Category = require("../models/Category");
const Brand = require("../models/Brands");
const Supplier = require("../models/Supplier");
const GSTSlab = require("../models/GSTSlab");
const Offer = require("../models/Offer");
const ReorderPoint = require("../models/ReorderPoint");
const Product = require("../models/Product");

// All the validators are listed here

module.exports.authenticate = [
  check("username", "Username is required")
    .not()
    .isEmpty(),
  check("password", "Password is required")
    .not()
    .isEmpty()
];

module.exports.Category = [
  check("categoryId")
    .custom(categoryId => {
      let patt = /[A-Z]{3}[1-9][0-9]{3}/;
      return patt.test(categoryId);
    })
    .withMessage("CategoryId must follow the format ABC1234")
    .custom((categoryId, { req }) => {
      if (req.method !== "PUT" && req.method !== "PATCH") {
        //PUT AND PATCH don't require id
        return !Category.isExist(categoryId);
      } else {
        return true;
      }
    })
    .withMessage("categoryId already exists"),
  check("parentCategory")
    .custom(parentCategory => {
      if (parentCategory) {
        let patt = /[A-Z]{3}[1-9][0-9]{3}/;
        return patt.test(parentCategory);
      } else {
        return true;
      }
    })
    .withMessage("Parent Category Id must follow the format ABC1234")
    .custom(parentCategory => {
      if (parentCategory) {
        return Category.isExist(parentCategory);
      } else {
        return true;
      }
    })
    .withMessage("Parent Category does not exist")
];

module.exports.Brand = [
  check("brandId")
    .custom(brandId => {
      let patt = /[A-Z]{2}[0-9]{3}/;
      return patt.test(brandId); //If categoryId is present test it
    })
    .withMessage("brandId must follow the format ABC1234")
    .custom((brandId, { req }) => {
      if (req.method !== "PUT" && req.method !== "PATCH") {
        //PUT AND PATCH don't require id
        return !Brand.isExist(brandId);
      } else {
        return true;
      }
    })
    .withMessage("brandId already exists")
];

module.exports.Supplier = [
  check("supplierId")
    .custom(supplierId => {
      let patt = /[A-Z]{2}[0-9]{3}/;
      return patt.test(supplierId); //If categoryId is present test it
    })
    .withMessage("supplierId must follow the format ABC1234")
    .custom((supplierId, { req }) => {
      if (req.method !== "PUT" && req.method !== "PATCH") {
        //PUT AND PATCH don't require id
        return !Supplier.isExist(supplierId);
      } else {
        return true;
      }
    })
    .withMessage("supplierId already exists")
];

module.exports.GSTSlab = [
  check("gstSlabId")
    .custom(gstSlabId => {
      let patt = /GST[0-9]{2}/;
      return patt.test(gstSlabId); //If id is present test it
    })
    .withMessage("gstSlabId must follow the format ABC1234")
    .custom((gstSlabId, { req }) => {
      if (req.method !== "PUT" && req.method !== "PATCH") {
        //PUT AND PATCH don't require id
        return !GSTSlab.isExist(gstSlabId);
      } else {
        return true;
      }
    })
    .withMessage("gstSlabId already exists"),
  check("rate")
    .isDecimal()
    .custom(rate => {
      if (rate < 0 || rate > 100) {
        throw new Error("Rate cannot be less than 0 or greater than 100");
      }
    })
];

module.exports.Offer = [
  check("productSKU")
    .custom((productSKU, { req }) => {
      if (req.method !== "PUT" && req.method !== "PATCH") {
        //PUT AND PATCH don't require id
        return !Offer.isExist(productSKU);
      } else {
        return true;
      }
    })
    .withMessage("Offer already exists. Prefer Editing it"),
  check("discountRate")
    .isDecimal()
    .custom(rate => {
      if (rate < 0 || rate > 100) {
        throw new Error(
          "discountRate cannot be less than 0 or greater than 100"
        );
      } else {
        return true;
      }
    }),
  check("expiry")
    .not()
    .isEmpty()
    .custom(expiry => {
      let date = new Date(expiry);
      let current = new Date();
      if (date < current) {
        throw new Error("Expiry date should be in future");
      }
    })
];

module.exports.ReorderPoint = [
  check("productSKU")
    .custom((productSKU, { req }) => {
      if (req.method !== "PUT" && req.method !== "PATCH") {
        //PUT AND PATCH don't require id
        return !ReorderPoint.isExist(productSKU);
      } else {
        return true;
      }
    })
    .withMessage("ReorderPoint already exists. Prefer Editing it"),
  check("minStockQty")
    .isNumeric()
    .custom(minStockQty => {
      if (minStockQty < 0) {
        throw new Error("ReorderPoint cannot be less than 0");
      } else {
        return true;
      }
    })
];

module.exports.Product = [
  check("productSKU")
    .custom((productSKU, { req }) => {
      if (req.method !== "PUT" && req.method !== "PATCH") {
        //PUT AND PATCH don't require id
        return !Product.isExist(productSKU);
      } else {
        return true;
      }
    })
    .withMessage("Product with give SKU already exists"),
  check("categoryId")
    .custom(categoryId => {
      return Category.isExist(categoryId);
    })
    .withMessage("Category with the given Id does not exists"),
  check("brandId")
    .custom(brandId => {
      return Brand.isExist(brandId);
    })
    .withMessage("Brand with the given Id does not exists"),
  check("suppliers").custom(suppliers => {
    for (let i = 0; i < suppliers.length; i++) {
      if (!Supplier.isExist(suppliers[i])) {
        throw new Error(`Supplier ${suppliers[i]} does not exist`);
      }
    }
    return true;
  }),
  check("price")
    .isNumeric("Should be of type number")
    .custom(price => {
      if (price < 0) {
        throw new Error("Price cannot be less than 0");
      } else {
        return true;
      }
    }),
  check("availability", "availability can be online, offline, both ").isIn([
    "both",
    "online",
    "offline"
  ]),
  check("ratings")
    .isNumeric("Should be of type number")
    .custom(rating => {
      if (rating < 0 || rating > 5) {
        throw new Error("Rating can not be less than 0 or greater than 5");
      } else {
        return true;
      }
    })
];
