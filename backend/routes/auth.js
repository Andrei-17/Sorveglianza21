const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authValidation } = require("../validation");
require("dotenv").config();

const User = require("../models/users.model");

router.post("/register", async (req, res) => {
    // Validation
    const { error } = authValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the database
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) return res.status(400).send("User already exists.");

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creating a new user
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
    });
    try {
        await user.save();
        res.sendStatus(200);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/login", async (req, res) => {
    // Validation
    const { error } = authValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Getting the user
    const user = await User.findOne({ username: req.body.username });

    // Checking if the user exists
    if (!user) return res.status(400).send("Invalid user.");

    // Checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password.");

    // Creating and retrieving the JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ jwt: token });
});

module.exports = router;
