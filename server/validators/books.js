const Joi = require('joi');

// Validation for book creation/update
const bookValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(2000).optional(),
    isbn: Joi.string().max(20).optional(),
    genre: Joi.string().min(1).max(50).required(),
    publisher: Joi.string().max(100).optional(),
    publishDate: Joi.date().optional(),
    language: Joi.string().max(10).optional(),
    pages: Joi.number().integer().min(1).optional(),
    coverImage: Joi.string().uri().optional(),
    pdfUrl: Joi.string().uri().required(),
    fileSize: Joi.number().integer().min(0).optional(),
    price: Joi.number().min(0).required(),
    accessType: Joi.string().valid('free', 'premium').required(),
    isPublished: Joi.boolean().optional(),
    uploadedBy: Joi.string().required(),
    tags: Joi.array().items(Joi.string().max(30)).optional()
  });

  return schema.validate(data);
};

module.exports = {
  bookValidation
};