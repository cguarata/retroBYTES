const saleRequest = require("./saleRequest.js");
const reservedProduct = require("./reservedProduct.js")
const rejectRequest = require("./rejectRequest.js");
const statusRequest = require("./statusRequest")

const effectiveSale = require("./effectiveSale.js");
const bookings = require("./bookings.js");
const listRequests = require("./listRequest.js");
const valuePurchase = require("./valuePurchase.js");


module.exports = {
  saleRequest,
  reservedProduct,
  rejectRequest,
  statusRequest,

  effectiveSale,
  bookings,
  listRequests,
  valuePurchase
};
