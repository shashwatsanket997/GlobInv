const Model = require("./main").Model;

let CategorySchema = {
  categoryId: {
    type: "string",
    required: true
  },
  name: {
    type: "string",
    required: true
  },
  gstSlabId: {
    type: "string",
    required: true
  },
  parentCategory: {
    type: "string",
    required: true
  },
  productProps: {
    type: "object",
    required: true
  }
};

let Category = new Model(
  CategorySchema,
  "categoryId",
  [],
  "/categories",
  "Category"
);

Category.create({
  categoryId: "INV1010",
  name: "Computers And Accessories",
  gstSlabId: "GST02",
  parentCategory: null,
  productProps: {
    specifications: null
  }
});

Category.create({
  categoryId: "INV1011",
  name: "Laptops",
  gstSlabId: "GST02",
  parentCategory: "INV1010",
  productProps: {
    CPUType: [
      "Intel Core i5",
      "Intel Core i7",
      "Intel Core i3",
      "AMD E-Series"
    ],
    memorySize: ["Up to 2GB", "4GB", "6GB"]
  }
});

Category.create({
  categoryId: "INV1200",
  name: "Men's Fashion",
  gstSlabId: "GST01",
  parentCategory: null,
  productProps: {}
});

Category.create({
  categoryId: "INV1201",
  name: "Men's Shirts",
  gstSlabId: "GST01",
  parentCategory: "INV1200",
  productProps: {
    material: ["Cotton", "Denim", "Linen", "Rayon"],
    standardSize: ["2XL", "XL", "L", "M", "S"]
  }
});

module.exports = Category;
