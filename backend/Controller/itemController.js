const Item = require('../models/itemModel.js')
const uploadToCloudinary = require("../utils/cloudinaryUpload.js");

const addItem = async (req, res) => {
  try {
    const { dishName, description, price, category } = req.body;

    if (!dishName || !description || !price || !category) {
      return res.status(400).json({ message: "All fields required" });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const item = await Item.create({
      dishName,
      description,
      price,
      category,
      image: imageUrl,
    });

    res.status(201).send({
      message: "success",
      item,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getItem = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "unable to fetch at the moment" });
  }
};

module.exports = { addItem, getItem };
