//routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderApi = require('../apis/orderApis');

router.post('/place', orderApi.place_order);

module.exports = router;
