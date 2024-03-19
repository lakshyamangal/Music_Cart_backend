const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { register, login } = require("../controllers/auth");
const { validateRequest } = require("../middlewares/requestValidator");
const verifyJwt = require("../middlewares/authMiddleware");

router.post(
  "/register",
  [
    check("name")
      .notEmpty()
      .withMessage("Name field is required")
      .isString()
      .withMessage("Name must be a string")
      .trim(),
    check("mobile")
      .isMobilePhone("en-IN", { strictMode: false })
      .withMessage("Invalid mobile phone number"),
    check("email", "Email is required")
      .isEmail()
      .withMessage("Must be a valid Email"),
    check(
      "password",
      "Password is required and must be at least 6 characters long"
    ).isLength({ min: 6 }),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, email, mobile, password } = req.body;
      const data = await register(name, email, mobile, password);
      res.send({ success: true, data: data });
    } catch (err) {
      res.send({ success: false, data: err.message });
    }
  }
);

router.post(
  "/login",
  [
    check("emailOrMobile", "Email or mobile number is required")
      .notEmpty()
      .withMessage("Email or mobile number is required"),
    check("password", "Password is required")
      .notEmpty()
      .withMessage("Password is required"),
    check("emailOrMobile").custom((value) => {
      // Check if emailOrMobile is a valid email address or mobile number
      if (!/\S+@\S+\.\S+/.test(value) && !/^\d{10}$/.test(value)) {
        throw new Error("Invalid email or mobile number");
      }
      return true;
    }),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { emailOrMobile, password } = req.body;
      const data = await login(emailOrMobile, password);
      res.send({ success: true, data: data });
    } catch (err) {
      res.send({ success: false, data: err.message });
    }
  }
);
module.exports = router;
