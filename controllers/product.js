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
const getSingleProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const getAllProducts = async (name, type, brand, color, priceRange, sortBy) => {
  try {
    let filter = {};
    let sort = {};
    if (name) {
      filter.name = { $regex: new RegExp(name, "i") };
    }
    if (type) filter.type = type;
    if (brand) filter.brand = { $regex: new RegExp(brand, "i") };
    // if (color) filter.color = { $regex: new RegExp(color, "i") };
    if (color && color.toLowerCase() === "other") {
      // Exclude common colors
      const excludeColors = ["black", "blue", "white", "grey", "brown"];
      filter.color = {
        $nin: excludeColors.map((color) => new RegExp(color, "i")),
      };
    } else if (color) {
      filter.color = { $regex: new RegExp(color, "i") }; // Case-insensitive color filter
    }

    if (priceRange) {
      const priceRangeFilter = priceRange.split("-");
      filter.price = {
        $gte: parseInt(priceRangeFilter[0]),
        $lte: parseInt(priceRangeFilter[1]),
      };
    }
    if (sortBy) {
      if (sortBy === "Lowest") {
        sort.price = 1;
      } else if (sortBy === "Highest") {
        sort.price = -1;
      } else if (sortBy === "A-Z") {
        sort.name = 1;
      } else if (sortBy === "Z-A") {
        sort.name = -1;
      }
    }
    const data = await Product.find(filter).sort(sort);
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(err);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
