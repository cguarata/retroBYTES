const newOrder = require("./newOrder.js");
const detailOrder = require("./detailOrder");
const modOrder = require("./modOrder");
const addToCart = require("./addToCart");
const activeCart = require("./activeCart");
const cartID = require("./cartID");
const removeFromCart= require("./removeFromCart");


module.exports = {
  newOrder,
  detailOrder,
  modOrder,
  addToCart,
  activeCart,
  cartID,
  removeFromCart
};
