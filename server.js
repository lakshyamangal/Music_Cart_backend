const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const invoiceRoutes = require("./routes/invoice");
const feedbackRoutes = require("./routes/feedback");
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/invoice", invoiceRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.get("/health", (req, res) => {
  res.json("status:active");
});

app.listen(PORT, () => {
  console.log("server is running !!");
});
