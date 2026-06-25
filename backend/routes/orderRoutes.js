const express = require('express');
const router = express.Router();

const { addOrder, getOrder, changeOrderStatus, getAllOrder } = require('../Controller/orderController')

router.post('/place-order', addOrder);
router.get('/get-order', getOrder);
router.put('/change-status/:id', changeOrderStatus)
router.get('/get-all-orders', getAllOrder)

module.exports = router;