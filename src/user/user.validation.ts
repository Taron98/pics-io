/** @format */

import Joi, { valid } from 'joi';
export const signUpJoi = () =>
  Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(4).alphanum().required(),
  }).unknown();

export const singInJoi = () =>
  Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).unknown();
