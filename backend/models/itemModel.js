const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image : { type: String}
});

module.exports = mongoose.model("Item", itemSchema)