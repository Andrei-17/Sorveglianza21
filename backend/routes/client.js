const router = require("express").Router();
require("dotenv").config();

const Activation = require("../models/activations.model");

Activation.find().then(async (activations) => {
    if (!activations.length) {
        activation = new Activation({
            date: new Date(),
            activated: false,
        });
        await activation.save();
    }
});

async function authenticateToken(req, res, next) {
    // Getting the JWT from the request header
    const token = req.headers["auth"] && req.headers["auth"].split(" ")[1];
    if (token == null) return res.sendStatus(403);

    // Validating the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        next();
    });
}

router.post("/", authenticateToken, async (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
