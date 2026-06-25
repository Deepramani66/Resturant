const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
      },
      dishName: { type: String },
      price: { type: Number },
      image: { type: String },
      quantity: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
