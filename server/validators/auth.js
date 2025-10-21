const Joi = require('joi');

// Validation for user registration
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    institution: Joi.string().max(100).optional()
  });

  return schema.validate(data);
};

// Validation for user login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation
};