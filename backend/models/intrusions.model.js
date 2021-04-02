const mongoose = require("mongoose");

const { Schema } = mongoose;

const intrusionSchema = new Schema({
    room: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const Intrusion = mongoose.model("Intrusion", intrusionSchema);

module.exports = Intrusion;
