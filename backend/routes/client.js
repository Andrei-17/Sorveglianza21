const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { activationsValidation } = require("../validation");
require("dotenv").config();

const Activation = require("../models/activations.model");
const Intrusion = require("../models/intrusions.model");

Activation.find().then(async (activations) => {
    if (!activations.length) {
        const activation = new Activation({
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

router.post("/activate", authenticateToken, async (req, res) => {
    const { error } = activationsValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const activations = await Activation.find();
    const currentStatus = activations[activations.length - 1]["activated"];

    if (currentStatus === req.body.status) return res.sendStatus(405);

    const activation = new Activation({
        activated: req.body.status,
        date: new Date(),
    });
    await activation.save();

    res.sendStatus(201);
});

router.get("/activations", authenticateToken, async (req, res) => {
    const activations = await Activation.find();
    res.status(200).send(activations);
});

router.get("/intrusions", authenticateToken, async (req, res) => {
    const intrusions = await Intrusion.find();
    res.status(200).send(intrusions);
});

module.exports = router;
