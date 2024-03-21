const express = require("express");
const router = express.Router();
const { check, body, param, query } = require("express-validator");
const { validateRequest } = require("../middlewares/requestValidator");
const verifyJwt = require("../middlewares/authMiddleware");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/product");

router.post("/createProduct", async (req, res) => {
  try {
    const {
      name,
      brand,
      type,
      color,
      price,
      smallDescription,
      rating,
      reviews,
      available,
      about,
      image,
    } = req.body;
    const data = await createProduct(
      name,
      brand,
      type,
      color,
      price,
      smallDescription,
      rating,
      reviews,
      available,
      about,
      image
    );
    res.send({ success: true, data: data });
  } catch (err) {
    console.log(err);
    res.send({ success: false, data: err.message });
  }
});

router.get(
  "/getSingleProduct/:productId",
  [param("productId").isMongoId("Product ID should be a valid mongoDb Id")],
  validateRequest,
  async (req, res) => {
    try {
      const productId = req.params.productId;
      const data = await getSingleProduct(productId);
      res.send({ success: true, data: data });
    } catch (err) {
      res.send({ success: false, data: err.message });
    }
  }
);

router.get(
  "/getAllProducts",
  [
    query("name").optional().isString(),
    query("type").optional().isIn(["inEar", "onEar", "overEar"]),
    query("brand").optional().isString(),
    query("color").optional().isString(),
    query("priceRange").optional().isString(),
    query("sortBy").optional().isIn(["Lowest", "Highest", "A-Z", "Z-A"]),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, type, brand, color, priceRange, sortBy } = req.query;
      const data = await getAllProducts(
        name,
        type,
        brand,
        color,
        priceRange,
        sortBy
      );
      res.send({ success: true, data: data });
    } catch (err) {
      console.log(err.message);
      res.send({ succcess: false, data: err.message });
    }
  }
);

module.exports = router;
