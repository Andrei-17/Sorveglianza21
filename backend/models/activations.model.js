const mongoose = require('mongoose');

const { Schema } = mongoose;

const activationSchema = new Schema({
    date: {
        type: Date,
        required: true,
    }
});

const Activation = mongoose.model('Activation', activationSchema);

module.exports = Activation;