
// cartApis.js
// Import the Cart model
const Cart = require('../model/Cart');

// Fetch cart for a specific user
const fetch_cart = async (req, res) => {
    const u_name = req.query.u_name; // Changed from req.body.u_name to req.query.u_name
    try {
        const cart = await Cart.find({ u_name });
        res.json({
            'fetch': 'success',
            'cart': cart
        });
        console.log("Log: Cart found");
    } catch (error) {
        res.json({ 'error': 'Error occurred in data fetching' });
        console.log("Log: Error occurred in data fetching");
    }
};

// Insert product into cart
const insert_to_cart = async (req, res) => {
    const reference = {
        u_name: req.body.u_name,
        p_id: req.body.p_id,
    };
    const data = {
        p_img: req.body.p_img,
        p_cost: req.body.p_cost
    };
    const cart = await Cart.find(reference);
    if (cart.length === 0) {
        const cartProduct = new Cart({
            ...reference,
            ...data,
            p_qty: 1
        });
        try {
            const savedCart = await cartProduct.save();
            res.json({
                'insert': 'success',
                'cart': savedCart
            });
            console.log("Log: Product added to cart");
        } catch (error) {
            res.json({ 'error': 'Error occurred in data insertion' });
            console.log("Log: Error occurred in data insertion");
        }
    } else {
        res.json({
            'insert': 'failure'
        });
        console.log("Log: Product already exists in cart");
    }
};

// Update product quantity in cart
const update_to_cart = async (req, res) => {
    try {
        const reference = {
            u_name: req.body.u_name,
            p_id: req.body.p_id,
        };

        // Find the cart item
        const cart = await Cart.findOne(reference);
        if (cart) {
            // Update the product quantity in the cart
            const updatedCart = await Cart.updateOne(reference, { $inc: { p_qty: 1 } });

            if (updatedCart.modifiedCount === 0) {
                res.status(400).json({ update: 'failure', message: 'Unable to update product quantity' });
                console.log("Log: Product quantity update failed");
            } else {
                res.status(200).json({
                    update: 'success',
                    cart: updatedCart,
                });
                console.log("Log: Product quantity updated in cart");
            }
        } else {
            res.status(404).json({ update: 'failure', message: 'Product not found in cart' });
            console.log("Log: Product not found in cart");
        }
    } catch (error) {
        res.status(500).json({ update: 'failure', message: 'Server error' });
        console.error("Log: Error updating cart", error);
    }
};

// Delete product from cart
const delete_from_cart = async (req, res) => {
    const reference = {
        u_name: req.body.u_name,
        p_id: req.body.p_id,
    };
    const cart = await Cart.find(reference);
    if (cart.length >= 1) {
        const p_qty = cart[0].p_qty;
        if (p_qty === 1) {
            const deletedCart = await Cart.deleteOne(reference);
            if (deletedCart.deletedCount === 0) {
                res.json({ 'delete': 'failure' });
                console.log("Log: Product not found in cart");
            } else {
                res.json({ 'delete': 'success' });
                console.log("Log: Product deleted from cart");
            }
        } else {
            const updatedCart = await Cart.updateOne(reference, { $inc: { p_qty: -1 } });
            if (updatedCart.modifiedCount === 0) {
                res.json({ 'update': 'failure' });
                console.log("Log: Product not found in cart");
            } else {
                res.json({ 'delete': 'success' });
                console.log("Log: Product quantity updated in cart");
            }
        }
    } else {
        res.json({ 'delete': 'failure' });
        console.log("Log: Product not found in cart");
    }
};

module.exports = {
    fetch_cart,
    insert_to_cart,
    update_to_cart,
    delete_from_cart
};
