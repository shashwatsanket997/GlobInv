const Model = require("./main").Model;
const Category = require("../models/Category");
const ValidationError = require("../utils/Errors").ValidationError;

class ProductModel extends Model {
  constructor(schema, id, initData, endpoint, name) {
    super(schema, id, initData, endpoint, name);
  }

  async getCategorySpecificProps(id) {
    let finalProps = {};
    let derivedProps = [];
    let category = await Category.getById(id);
    while (category) {
      if (category.productProps) {
        derivedProps.push(category.productProps);
      }
      let parentId = category.parentCategory;
      if (parentId) {
        category = await Category.getById(parentId);
      } else {
        break;
      }
    }
    // Attribute Overriding
    for (let i = 0; i < derivedProps.length; i++) {
      let currentNode = Object.keys(derivedProps[i]);
      for (let j = 0; j < currentNode.length; j++) {
        if (!(currentNode[j] in finalProps)) {
          finalProps[currentNode[j]] = derivedProps[i][currentNode[j]];
        }
      }
    }
    return finalProps;
  }

  //override custom validator
  async validateParams(data, strict = false, excemt = []) {
    let categoryProps = await this.getCategorySpecificProps(data.categoryId);
    let validationError = []; //To store the validation error
    let requiredKey = Object.keys(categoryProps);
    for (let i = 0; i < requiredKey.length; i++) {
      if (!(requiredKey[i] in data)) {
        validationError.push(
          `${requiredKey[i]} is required category-specific key in Products`
        );
      } else {
        // check its value is present in the pre-defined values
        let key = requiredKey[i];
        let vals = categoryProps[key]; //if null it can have (Custom values)
        if (vals && !vals.includes(data[key])) {
          validationError.push(
            `Value for ${key} is not valid. It can have ${vals.join(",")}`
          );
        }
      }
    }
    // Throw validation error if present
    if (validationError.length) {
      console.log(validationError);
      throw new ValidationError("Validation Error", validationError); //rejected promise will be returned
    }
    // Removing Category specific props from data
    let clonedData = Object.assign({}, data);
    for (let i = 0; i < requiredKey.length; i++) {
      delete clonedData[requiredKey[i]];
    }
    await super.validateParams(clonedData, strict, excemt);
  }
}

let ProductSchema = {
  productSKU: {
    type: "string",
    required: true
  },
  name: {
    type: "string",
    required: true
  },
  categoryId: {
    type: "string",
    required: true
  },
  keywords: {
    type: "array",
    required: true
  },
  brandId: {
    type: "array",
    required: true
  },
  price: {
    type: "number",
    required: true
  },
  imageURIs: {
    type: "array",
    required: true
  },
  stock: {
    type: "number",
    required: true
  },
  availability: {
    type: "string",
    required: true
  },
  ratings: {
    type: "number",
    required: true
  },
  suppliers: {
    type: "array",
    required: true
  }
};
let Product = new ProductModel(
  ProductSchema,
  "productSKU",
  [],
  "/products",
  "Product"
);

module.exports = Product;
