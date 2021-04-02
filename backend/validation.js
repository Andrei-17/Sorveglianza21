const Joi = require("@hapi/joi");

// Auth Validation
const authValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(32).required(),
        password: Joi.string().min(6).max(255).required(),
    });
    return schema.validate(data);
};

// Sensor Validation
const sensorValidation = (data) => {
    const schema = Joi.object({
        room: Joi.string().min(2).max(32).required(),
    });
    return schema.validate(data);
};

module.exports.authValidation = authValidation;
module.exports.sensorValidation = sensorValidation;
