const Model = require("./main").Model;

let BrandSchema = {
  brandId: {
    type: "string",
    required: true
  },
  name: {
    type: "string",
    required: true
  },
  website: {
    type: "string",
    required: true
  },
  email: {
    type: "string",
    required: true
  }
};

let Brand = new Model(BrandSchema, "brandId", [], "/brands", "Brand");

Brand.create({
  brandId: "BR101",
  name: "Denim",
  website: "www.denimcloths.com",
  email: "info@denimcloths.com"
});

Brand.create({
  brandId: "BR102",
  name: "Jaze Cloths",
  website: "www.jazecloths.com",
  email: "info@jazecloths.com"
});

module.exports = Brand;
