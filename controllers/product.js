const Product = require("../models/product");
const moment = require("moment");
const mongoose = require("mongoose");

const createProduct = async (
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
) => {
  try {
    const productDetails = new Product({
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
    });
    const savedproduct = await productDetails.save();
    const data = "Card created successfully!!";
    return data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

module.exports = {
  createProduct,
};
