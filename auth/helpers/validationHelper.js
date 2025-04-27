const Joi = require("joi");
const Boom = require("boom");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    notelp: Joi.string().required(),
    alamat: Joi.string().required(),
    role: Joi.number().integer().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const changePasswordValidation = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const urlForgotPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const forgotPasswordValidation = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const createSavedLocationValidation = (body) => {
  const { label, address, latitude, longitude } = body;
  if (!label || !address || latitude == null || longitude == null) {
    throw new Error("All fields (label, address, latitude, longitude) are required.");
  }
};

module.exports = {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  urlForgotPasswordValidation,
  forgotPasswordValidation,
  createSavedLocationValidation,
};