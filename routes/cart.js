const express = require("express");
const router = express.Router();
const { check, body, param } = require("express-validator");
const { validateRequest } = require("../middlewares/requestValidator");
const verifyJwt = require("../middlewares/authMiddleware");

router.post("/createCart", async (req, res) => {
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
module.exports = router;
