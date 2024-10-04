const Order = require('../model/Order');

const place_order = async (req, res) => {
    const orderData = {
        u_name: req.body.u_name,
        items: req.body.items,
        total_cost: req.body.total_cost,
    };
    const order = new Order(orderData);
    try {
        const savedOrder = await order.save();
        res.json({ 'order': 'success', 'orderData': savedOrder });
    } catch (error) {
        res.json({ 'error': 'Error occurred while placing order' });
    }
};

module.exports = {
    place_order,
};
