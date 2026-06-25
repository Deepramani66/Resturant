const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloudnery_api_key,
  api_secret: process.env.cloudnery_api_secret,
});

module.exports = cloudinary;