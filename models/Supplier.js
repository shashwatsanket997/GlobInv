const Model = require("./main").Model;

let SupplierSchema = {
  supplierId: {
    type: "string",
    required: true
  },
  name: {
    type: "string",
    required: true
  },
  address: {
    type: "string",
    required: true
  },
  email: {
    type: "string",
    required: true
  }
};

let Supplier = new Model(
  SupplierSchema,
  "supplierId",
  [],
  "/suppliers",
  "Supplier"
);

Supplier.create({
  supplierId: "SP101",
  name: "Express shippings",
  address: "Sector-1A, Chennai",
  email: "info@expressshippings.com"
});

module.exports = Supplier;
