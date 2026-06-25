const Cart = require("../models/cartModel.js");
const Item = require("../models/itemModel.js");

const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const existing = cart.items.find(
      (item) => item.itemId.toString() === itemId
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      const product = await Item.findById(itemId);

      cart.items.push({
        itemId,
        dishName: product.dishName,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    await cart.save();

    res.status(201).send({
      message: "success",
      cart,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).send({
      message: "Server error",
    });
  }
};

const getCart = async (req, res) => {
  const cart = await Cart.findOne();
  res.json(cart || { items: [] });
};

const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedItem = await Cart.findOneAndUpdate(
      { "items._id": id },
      {
        $set: {
          "items.$.quantity": quantity,
        },
      },
      {
        returnDocument: "after",
      },
    );

    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

const removeItemCart = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCart = await Cart.findOneAndUpdate(
      { "items._id": id },
      {
        $pull: {
          items: { _id: id },
        },
      },
      {
        returnDocument: "after",
      },
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = { addToCart, getCart, updateCartQuantity, removeItemCart };
