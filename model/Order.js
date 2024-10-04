//model/Order.js
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    u_name: String,
    items: Array,
    total_cost: Number,
    order_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema, "orders");
