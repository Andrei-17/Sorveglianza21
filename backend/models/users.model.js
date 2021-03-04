const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 32
    },
    password: {
        type: String,
        required: true,
        minLength: 6, 
        maxLength: 255
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;