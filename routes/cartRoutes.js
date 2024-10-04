

//routes //cartRoutes.js
//import express module
const express = require('express');
//create router instance
const router = express.Router();

//import cartApi
const cartApi = require('../apis/cartApis');

//insert to cart
router.post('/insert', cartApi.insert_to_cart);

//update to cart
router.put('/update', cartApi.update_to_cart);

//delete from cart
router.delete('/delete', cartApi.delete_from_cart);

//fetch from cart
//http://localhost:8080/cart/fetch?u_name=Rohan
router.get('/fetch', cartApi.fetch_cart); // Ensure this matches the fetch_cart function

//export router
module.exports = router;
