const Model = require("./main").Model;

let taxSchema = {
  gstSlabId: {
    type: "string",
    required: true
  },
  name: {
    type: "string",
    required: true
  },
  rate: {
    type: "number",
    required: true
  }
};

let GSTSlab = new Model(taxSchema, "gstSlabId", [], "/gstslabs", "GSTSlab");

GSTSlab.create({
  gstSlabId: "GST01",
  name: "Clothing",
  rate: 5
});

module.exports = GSTSlab;
