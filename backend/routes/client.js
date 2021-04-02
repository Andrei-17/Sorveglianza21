const router = require("express").Router();

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

router.post("/", async (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
