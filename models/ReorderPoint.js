const Model = require("./main").Model;

let RPSchema = {
  productSKU: {
    type: "string",
    required: true
  },
  minStockQty: {
    type: "number",
    required: true
  }
};

let ReorderPoint = new Model(
  RPSchema,
  "productSKU",
  [],
  "/reorderpoints",
  "ReorderPoint"
);

ReorderPoint.create({
  productSKU: "fjjshe32sadk33",
  minStockQty: 10
});

module.exports = ReorderPoint;
