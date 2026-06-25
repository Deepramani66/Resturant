const express = require('express');
const router = express.Router();
const upload = require('../config/multer.js')

const { addItem, getItem } = require('../Controller/itemController.js');

router.post('/add-item', upload.single('image'), addItem)
router.get('/get-item', getItem)

module.exports = router;

