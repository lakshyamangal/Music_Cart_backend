const express = require("express");
const router = express.Router();
const { check, body, param } = require("express-validator");
const { validateRequest } = require("../middlewares/requestValidator");
const verifyJwt = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");
const {
  createInvoice,
  getSingleInvoice,
  getAllInvoice,
} = require("../controllers/invoice");

router.post(
  "/createInvoice",
  verifyJwt,
  [
    check("name")
      .trim()
      .notEmpty()
      .withMessage("Name  is a required field")
      .isString()
      .withMessage("Name must be a String"),
    check("address")
      .trim()
      .notEmpty()
      .withMessage("Address  is a required field")
      .isString()
      .withMessage("Address must be a String"),
    check("payment", "payment is a required field")
      .isIn(["Pay on Delivery", "UPI", "Card"])
      .withMessage("invalid payment type"),
    check("productId")
      .isArray()
      .custom((value) => {
        if (value.length > 0) {
          const areValidIds = value.every((id) =>
            mongoose.Types.ObjectId.isValid(id)
          );
          if (areValidIds) {
            return true;
          } else {
            throw new Error("Invalid Product Ids");
          }
        }
        throw new Error("Must contain at least 1 product");
      }),
    check("totalBill")
      .notEmpty()
      .withMessage("Total Amount Required")
      .isNumeric()
      .withMessage("Must be a Number"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { userId, name, address, payment, productId, totalBill } = req.body;
      const data = await createInvoice(
        userId,
        name,
        address,
        payment,
        productId,
        totalBill
      );
      res.send({ success: true, data: data });
    } catch (err) {
      console.log(err);
      res.send({ success: false, data: err.message });
    }
  }
);

router.get(
  "/getSingleInvoice/:invoiceId",
  [param("invoiceId").isMongoId("invoiceId should be a valid mongoDb Id")],
  validateRequest,
  async (req, res) => {
    try {
      const invoiceId = req.params.invoiceId;
      const data = await getSingleInvoice(invoiceId);
      res.send({ success: true, data: data });
    } catch (err) {
      res.send({ success: false, data: err.message });
    }
  }
);

router.get("/getAllInvoice", verifyJwt, async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = await getAllInvoice(userId);
    res.send({ success: true, data: data });
  } catch (err) {
    console.log(err);
    res.send({ success: false, data: err.message });
  }
});

module.exports = router;
