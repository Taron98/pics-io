/** @format */

import Joi from 'joi';

const possibleDestinationSchema = Joi.object().pattern(Joi.string(), Joi.boolean());

export const eventJoi = () =>
  Joi.object({
    payload: Joi.object().required(),
    possibleDestinations: Joi.array().items(possibleDestinationSchema).required(),
    strategy: Joi.string()
      .valid('ALL', 'ANY', 'function(possibleDestinations) { return true; }')
      .optional(),
  }).unknown();
