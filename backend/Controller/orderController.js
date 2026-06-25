const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const addOrder = async (req, res) => {
  try {
    const { fullName, email, street, postalCode, city } = req.body;

    const cart = await Cart.findOne();

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const formattedItems = cart.items.map((item) => ({
      itemId: item._id,
      dishName: item.dishName,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      customer: {
        fullName,
        email,
        street,
        postalCode,
        city,
      },

      items: formattedItems,

      totalAmount,

      orderStatus: "pending",
    });

    cart.items = [];

    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus,
      },
      {
        returnDocument: "after",
      },
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated",
      updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({
      orderStatus: {
        $ne: "delivered",
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  addOrder,
  getOrder,
  changeOrderStatus,
  getAllOrder
};
