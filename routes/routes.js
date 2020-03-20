// All the routes are listed here
const express = require("express");
const uploder = require("../utils/imageUploader").upload;
const uploadResponse = require("../utils/imageUploader").uploadResponse;
const authController = require("../controllers/auth.controller");
const pmsController = require("../controllers/pms.controller");
const validator = require("../validators/validators");

module.exports = function(app) {
  // Creating router for /api
  const apiRoutes = express.Router();
  app.use("/api", apiRoutes);

  //Endpoint: BASE_URL+/api
  apiRoutes.get("/", (req, res) => {
    res.status(200).json({
      message: "Hello this is starting"
    });
  });

  apiRoutes.post("/auth", validator.authenticate, authController.authenticate);

  // Images
  apiRoutes.post("/images", uploder.single("image"), uploadResponse);

  //Category
  const categoryRoute = express.Router();
  categoryRoute.get("/", pmsController.getCategory);
  categoryRoute.post("/", validator.Category, pmsController.createCategory);
  categoryRoute.get("/:categoryId", pmsController.getCategoryById);
  categoryRoute.put(
    "/:categoryId",
    validator.Category,
    pmsController.editCategory
  );
  categoryRoute.patch(
    "/:categoryId",

    pmsController.updateCategory
  );
  categoryRoute.delete("/:categoryId", pmsController.deleteCategory);
  apiRoutes.use("/categories", categoryRoute);

  // Brands

  const brandRoute = express.Router();
  brandRoute.get("/", pmsController.getBrand);
  brandRoute.post("/", validator.Brand, pmsController.createBrand);
  brandRoute.get("/:brandId", pmsController.getBrandById);
  brandRoute.put("/:brandId", validator.Brand, pmsController.editBrand);
  brandRoute.patch("/:brandId", pmsController.updateBrand);
  brandRoute.delete("/:brandId", pmsController.deleteBrand);
  apiRoutes.use("/brands", brandRoute);

  //Supplier Routes
  const supplierRoute = express.Router();
  supplierRoute.get("/", pmsController.getSuppliers);
  supplierRoute.post("/", validator.Supplier, pmsController.createSupplier);
  supplierRoute.get("/:supplierId", pmsController.getSupplierById);
  supplierRoute.put(
    "/:supplierId",
    validator.Supplier,
    pmsController.editSupplier
  );
  supplierRoute.patch(
    "/:supplierId",

    pmsController.updateSupplier
  );
  supplierRoute.delete("/:supplierId", pmsController.deleteSupplier);
  apiRoutes.use("/suppliers", supplierRoute);

  //GSTSlab Routes
  const gstSlabRoute = express.Router();
  gstSlabRoute.get("/", pmsController.getGSTSlabs);
  gstSlabRoute.post("/", validator.GSTSlab, pmsController.createGSTSlab);
  gstSlabRoute.get("/:gstSlabId", pmsController.getGSTSlabById);
  gstSlabRoute.put("/:gstSlabId", validator.GSTSlab, pmsController.editGSTSlab);
  gstSlabRoute.patch(
    "/:gstSlabId",

    pmsController.updateGSTSlab
  );
  gstSlabRoute.delete("/:gstSlabId", pmsController.deleteGSTSlab);
  apiRoutes.use("/gstslabs", gstSlabRoute);

  // Offer
  const offerRoute = express.Router();
  offerRoute.get("/", pmsController.getOffers);
  offerRoute.post("/", validator.Offer, pmsController.createOffer);
  offerRoute.get("/:productSKU", pmsController.getOfferBySKU);
  offerRoute.put("/:productSKU", validator.Offer, pmsController.editOffer);
  offerRoute.patch(
    "/:productSKU",

    pmsController.updateOffer
  );
  offerRoute.delete("/:productSKU", pmsController.deleteOffer);
  apiRoutes.use("/offers", offerRoute);

  //Reorder Point

  const reorderPointRoute = express.Router();
  reorderPointRoute.get("/", pmsController.getReorderPoints);
  reorderPointRoute.post(
    "/",
    validator.ReorderPoint,
    pmsController.createReorderPoint
  );
  reorderPointRoute.put(
    "/:productSKU",
    validator.ReorderPoint,
    pmsController.editReorderPoint
  );
  reorderPointRoute.delete("/:productSKU", pmsController.deleteReorderPoint);
  apiRoutes.use("/reorderPoints", reorderPointRoute);

  // Offer
  const productRoute = express.Router();
  productRoute.get("/", pmsController.getProducts);
  productRoute.post("/", validator.Product, pmsController.createProduct);
  productRoute.get("/:productSKU", pmsController.getProductBySKU);
  productRoute.put(
    "/:productSKU",
    validator.Product,
    pmsController.editProduct
  );
  productRoute.patch("/:productSKU", pmsController.updateProduct);
  productRoute.delete("/:productSKU", pmsController.deleteProduct);
  apiRoutes.use("/products", productRoute);
};
