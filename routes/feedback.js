const express = require("express");
const router = express.Router();
const { check, body, param } = require("express-validator");
const { validateRequest } = require("../middlewares/requestValidator");
const verifyJwt = require("../middlewares/authMiddleware");
const { createFeedback } = require("../controllers/feedback");

router.post(
  "/createFeedback",
  verifyJwt,
  [
    check("type", "Type is a required field")
      .isIn(["Bugs", "Feedback", "Query"])
      .withMessage("invalid type"),
    check("description")
      .trim()
      .notEmpty()
      .withMessage("Description is a required field")
      .isString()
      .withMessage("Description  must be a String"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { userId, type, description } = req.body;
      const data = await createFeedback(userId, type, description);
      res.send({ success: true, data: data });
    } catch (err) {
      console.log(err);
      res.send({ success: false, data: err.message });
    }
  }
);
module.exports = router;
