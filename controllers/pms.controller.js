// Product Management System : PMS
var Category = require("../models/Category");
const { validationResult } = require("express-validator");
const ValidationError = require("../utils/Errors").ValidationError;
var Brand = require("../models/Brands");
var Supplier = require("../models/Supplier");
var GSTSlab = require("../models/GSTSlab");
var Offer = require("../models/Offer");
var ReorderPoint = require("../models/ReorderPoint");
var Product = require("../models/Product");

module.exports.getCategory = async (req, res, next) => {
  let { page, limit } = req.query;
  try {
    let data = await Category.getWithPagination(page, limit);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
module.exports.createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let data = await Category.create(req.body);
    res.status(200).json(data.prepareResponse());
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.getCategoryById = async (req, res, next) => {
  try {
    let id = req.params.categoryId;
    let data = await Category.getById(id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.editCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.categoryId;
    let data = await Category.put(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.updateCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.categoryId;
    let data = await Category.patch(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCategory = async (req, res, next) => {
  try {
    let id = req.params.categoryId;
    let data = await Category.delete(id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Brands

module.exports.getBrand = async (req, res, next) => {
  let { page, limit } = req.query;
  try {
    let data = await Brand.getWithPagination(page, limit);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.createBrand = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let data = await Brand.create(req.body);
    res.status(200).json(data.prepareResponse());
  } catch (err) {
    next(err);
  }
};

module.exports.getBrandById = async (req, res, next) => {
  try {
    let id = req.params.brandId;
    let data = await Brand.getById(id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.editBrand = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.brandId;
    let data = await Brand.put(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.updateBrand = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.brandId;
    let data = await Brand.patch(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteBrand = async (req, res, next) => {
  try {
    let id = req.params.brandId;
    let data = await Brand.delete(id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Suppliers

module.exports.getSuppliers = async (req, res, next) => {
  let { page, limit } = req.query;
  try {
    let data = await Supplier.getWithPagination(page, limit);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.createSupplier = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let data = await Supplier.create(req.body);
    res.status(200).json(data.prepareResponse());
  } catch (err) {
    next(err);
  }
};

module.exports.getSupplierById = async (req, res, next) => {
  try {
    let id = req.params.supplierId;
    let data = await Supplier.getById(id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.editSupplier = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.supplierId;
    let data = await Supplier.put(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.updateSupplier = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.supplierId;
    let data = await Supplier.patch(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSupplier = async (req, res, next) => {
  try {
    let id = req.params.supplierId;
    let data = await Supplier.delete(id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// GST slab

module.exports.getGSTSlabs = async (req, res, next) => {
  let { page, limit } = req.query;
  try {
    let data = await GSTSlab.getWithPagination(page, limit);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.createGSTSlab = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let data = await GSTSlab.create(req.body);
    res.status(200).json(data.prepareResponse());
  } catch (err) {
    next(err);
  }
};

module.exports.getGSTSlabById = async (req, res, next) => {
  try {
    let id = req.params.gstSlabId;
    let data = await GSTSlab.getById(id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.editGSTSlab = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.gstSlabId;
    let data = await GSTSlab.put(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.updateGSTSlab = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.gstSlabId;
    let data = await GSTSlab.patch(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteGSTSlab = async (req, res, next) => {
  try {
    let id = req.params.gstSlabId;
    let data = await GSTSlab.delete(id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Offer

module.exports.getOffers = async (req, res, next) => {
  let { page, limit } = req.query;
  try {
    let data = await Offer.getWithPagination(page, limit);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.createOffer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let data = await Offer.create(req.body);
    res.status(200).json(data.prepareResponse());
  } catch (err) {
    next(err);
  }
};

module.exports.getOfferBySKU = async (req, res, next) => {
  try {
    let id = req.params.productSKU;
    let data = await Offer.getById(id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.editOffer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.productSKU;
    let data = await Offer.put(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.updateOffer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.productSKU;
    let data = await Offer.patch(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteOffer = async (req, res, next) => {
  try {
    let id = req.params.productSKU;
    let data = await Offer.delete(id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Reorder Point

module.exports.getReorderPoints = async (req, res, next) => {
  let { page, limit } = req.query;
  try {
    let data = await ReorderPoint.getWithPagination(page, limit);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.createReorderPoint = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let data = await ReorderPoint.create(req.body);
    res.status(200).json(data.prepareResponse());
  } catch (err) {
    next(err);
  }
};

module.exports.getReorderPoint = async (req, res, next) => {
  try {
    let id = req.params.productSKU;
    let data = await ReorderPoint.getById(id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.editReorderPoint = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.productSKU;
    let data = await ReorderPoint.put(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteReorderPoint = async (req, res, next) => {
  try {
    let id = req.params.productSKU;
    let data = await ReorderPoint.delete(id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Products : CRUD

module.exports.getProducts = async (req, res, next) => {
  let { page, limit } = req.query;
  try {
    let data = await Product.getWithPagination(page, limit);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.createProduct = async (req, res, next) => {
  console.log("Product");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let data = await Product.create(req.body);
    res.status(201).json(data.prepareResponse());
  } catch (err) {
    next(err);
  }
};

module.exports.getProductBySKU = async (req, res, next) => {
  try {
    let id = req.params.productSKU;
    let data = await Product.getById(id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.editProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.productSKU;
    let data = await Product.put(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Sending the errors to Express Error Handler
    return next(
      new ValidationError(
        "Validation Error",
        errors.array().map(val => val.msg)
      )
    );
  }
  try {
    let id = req.params.productSKU;
    let data = await Product.patch(id, req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    let id = req.params.productSKU;
    let data = await Product.delete(id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
