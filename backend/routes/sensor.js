const router = require("express").Router();

router.post("/", (req, res) => {
    console.log(req.query)
    res.sendStatus(200);
})

module.exports = router;
