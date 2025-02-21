import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateRideCreation = (req: Request, res: Response, next: NextFunction) => {
  const rideValidation = Joi.object({
    pickup: Joi.string().required().messages({
      'string.empty': 'Pickup location cannot be empty',
      'string.base': 'Pickup location must be a string'
    }),
    destination: Joi.string().required().messages({
      'string.empty': 'Destination cannot be empty',
      'string.base': 'Destination must be a string'
    }),
     pickupLatitude: Joi.number().required().messages({
        'number.base': 'Pickup latitude must be a number',
        'any.required': 'Pickup latitude is required'
      }),
      pickupLongitude: Joi.number().required().messages({
        'number.base': 'Pickup longitude must be a number',
        'any.required': 'Pickup longitude is required'
      }),
  
      destinationLatitude: Joi.number().required().messages({
        'number.base': 'Destination latitude must be a number',
        'any.required': 'Destination latitude is required'
      }),
      destinationLongitude: Joi.number().required().messages({
        'number.base': 'Destination longitude must be a number',
        'any.required': 'Destination longitude is required'
      }),
  });

  const { error } = rideValidation.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
     res.status(400).json({ errors: errorMessages });
     return;
  }
  next();
};

export const validateMatchRequest = (req: Request, res: Response, next: NextFunction) => {
  const matchValidation = Joi.object({
    latitude: Joi.number().required().messages({
      'number.base': 'Latitude must be a number',
      'any.required': 'Latitude is required'
    }),
    longitude: Joi.number().required().messages({
      'number.base': 'Longitude must be a number',
      'any.required': 'Longitude is required'
    })
  });

  const { error } = matchValidation.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
     res.status(400).json({ errors: errorMessages });
     return;
  }
  next();
};
