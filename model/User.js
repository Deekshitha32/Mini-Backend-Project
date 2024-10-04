//model/User.js
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    u_id: { type: Number, required: true },
    u_name: { type: String, required: true, unique: true },
    u_pwd: { type: String, required: true },
    u_email: { type: String, required: true },
    u_addr: { type: String, required: true },
    u_contact: { type: Number, required: true }
});

// Ensure indexes are created
usersSchema.index({ u_name: 1 }, { unique: true });

module.exports = mongoose.model("User", usersSchema, "users");
