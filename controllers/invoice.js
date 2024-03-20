const Product = require("../models/product");
const Invoice = require("../models/invoice");
const User = require("../models/user");
const mongoose = require("mongoose");

const createInvoice = async (
  userId,
  name,
  address,
  payment,
  productId,
  totalBill
) => {
  try {
    const invoiceDetails = new Invoice({
      userId,
      name,
      address,
      payment,
      productId,
      totalBill,
    });
    const savedInvoice = await invoiceDetails.save();
    const invoiceId = savedInvoice._id;
    await User.findByIdAndUpdate(userId, { $push: { invoice: invoiceId } });
    const data = "Invoice created successfully!!";
    return data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const getSingleInvoice = async (invoiceID) => {
  try {
    const invoice = await Invoice.findById(invoiceID).populate({
      path: "productId",
    });
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return invoice;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const getAllInvoice = async (userId) => {
  try {
    const invoice = await User.findById(userId).populate({
      path: "invoice",
    });
    const allInvoices = invoice.invoice;
    return allInvoices;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

module.exports = { createInvoice, getSingleInvoice, getAllInvoice };
