const express = require('express');
const router = express.Router();

const { createPaymentOrder, verifyPayment } = require('../Controller/paymentController')

router.post('/payments/create-order/:orderId', createPaymentOrder)
router.post("/payments/verify", verifyPayment);

module.exports = router;