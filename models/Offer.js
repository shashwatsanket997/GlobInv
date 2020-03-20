const Model = require("./main").Model;

let offerSchema = {
  productSKU: {
    type: "string",
    required: true
  },
  discountRate: {
    type: "number",
    required: true
  },
  name: {
    type: "string",
    required: true
  },
  expiry: {
    type: "string",
    required: true
  }
};

let Offer = new Model(offerSchema, "productSKU", [], "/offers", "Offer");

Offer.create({
  productSKU: "fjjshe32sadk33",
  name: "Summer Sale",
  discountRate: 50,
  expiry: new Date(2020, 05, 31).toISOString()
});

module.exports = Offer;
