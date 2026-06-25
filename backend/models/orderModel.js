const mongoose = require("mongoose");

const items = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish",
  },

  dishName: {
    type: String,
  },

  image: {
    type: String,
  },

  price: {
    type: Number,
  },

  quantity: {
    type: Number,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      fullName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      street: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },
    },

    items: [items],

    totalAmount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      default: null,
    },

    razorpayOrderId: {
      type: String,
      default: null,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    razorpaySignature: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
