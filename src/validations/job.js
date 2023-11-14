const Joi = require("joi");

const jobSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().min(10),
    fee: Joi.number().min(100),
    image: Joi.any(),
})

module.exports = { jobSchema }