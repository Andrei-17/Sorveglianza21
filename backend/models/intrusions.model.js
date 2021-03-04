const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
    image: String
})

const intrusionSchema = new Schema({
    ID: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    images: [imageSchema]
});

const Intrusion = mongoose.model('Intrusion', intrusionSchema);

module.exports = Intrusion;