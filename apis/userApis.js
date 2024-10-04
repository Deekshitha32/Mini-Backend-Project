

// //userApis.js
const token = require('./token');
const User = require('../model/User');

const loginUser = async (req, res) => {
    const { u_name, u_pwd } = req.body;
    try {
        const user = await User.findOne({ u_name, u_pwd });
        if (!user) {
            console.log("Log: User not found");
            return res.status(401).json({ auth: 'failure', message: 'Login failed. Please check your username and password.' });
        }
        const jwt_token = token({ u_name, u_pwd }, new Date().toString());
        console.log("Log: User found");
        res.json({ auth: 'success', token: jwt_token });
    } catch (error) {
        console.error("Log: Error occurred in data fetching", error);
        res.status(500).json({ error: 'An error occurred in data fetching' });
    }
};

const registerUser = async (req, res) => {
    const { u_id, u_name, u_pwd, u_email, u_addr, u_contact } = req.body;
    const user = new User({ u_id, u_name, u_pwd, u_email, u_addr, u_contact });
    try {
        const savedUser = await user.save();
        console.log("Log: User registered");
        res.status(201).json({ registration: 'success', user: savedUser });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            console.error("Log: Duplicate username error", error);
            res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
        } else {
            console.error("Log: Error occurred in data insertion", error);
            res.status(400).json({ error: 'An error occurred in data insertion' });
        }
    }
};

module.exports = { loginUser, registerUser };
