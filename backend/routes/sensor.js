const router = require("express").Router();
const fileUpload = require("express-fileupload");
const { sensorValidation } = require("../validation");

const Intrusion = require("../models/intrusions.model");

const isAlarmActive = async () => {
    const activations = await require("../models/activations.model").find();
    return activations[activations.length - 1].activated;
};

router.use(fileUpload());

router.post("/", async (req, res) => {
    const { error } = sensorValidation(req.query);
    if (error) return res.status(400).send(error.details[0].message);
    if (!(await isAlarmActive())) return res.sendStatus(200);

    const date = new Date();

    if (req.files && req.files.media) {
        let imgName = "";
        for (e of date.toISOString().split(":")) {
            imgName += e;
        }
        req.files.media.mv(`./public/images/${imgName}.jpg`);
    }

    intrusion = new Intrusion({
        room: req.query.room,
        date: date,
    });
    await intrusion.save();

    res.sendStatus(201);
});

module.exports = router;
