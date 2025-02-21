import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { UserRole } from "../enum/user.enum";


export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    const createUserValidation = Joi.object({
      firstName: Joi.string().required().messages({
        'string.empty': 'First Name cannot be empty',
        'string.base': 'First Name must be a string'
      }),
      lastName: Joi.string().required().messages({
        'string.empty': 'Last Name cannot be empty',
        'string.base': 'Last Name must be a string'
      }),
      password: Joi.string().required().messages({
        'string.empty': 'Password cannot be empty',
        'string.base': 'Password must be a string',
      }),
      mobile: Joi.string().required().messages({
        'string.empty': 'Mobile cannot be empty',
        'string.base': 'Mobile number must be a string',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.base': 'Email must be a string',
      }),      
      longitude: Joi.string().required().messages({
        'number.empty': 'Email cannot be empty',
        'number.base': 'Email must be a string',
      }),      
      latitude: Joi.string().required().messages({
        'number.empty': 'latitude cannot be empty',
        'number.base': 'latitude must be a number',
      }),
      vehicle: Joi.string().when('role', {
        is: UserRole.driver,
        then: Joi.string().required().messages({
          'string.empty': 'Vehicle is required when role is driver'
        }),
        otherwise: Joi.string().optional()
      }),
      color: Joi.string().when('role', {
        is:  UserRole.driver,
        then: Joi.string().required().messages({
          'string.empty': 'Color is required when role is driver'
        }),
        otherwise: Joi.string().optional()
      }),
      plateNumber: Joi.string().when('role', {
        is:  UserRole.driver,
        then: Joi.string().required().messages({
          'string.empty': 'Plate Number is required when role is driver'
        }),
        otherwise: Joi.string().optional()
      }),
    });
  
    const { error } = createUserValidation.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
     res.status(400).json({ errors: errorMessages });
     return;
    }
  
    next();
  };


  export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const loginUserValidation = Joi.object({
      password: Joi.string().required().messages({
        'string.empty': 'Password cannot be empty',
        'string.base': 'Password must be a string',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.base': 'Email must be a string',
      }),
    });
  
    const { error } = loginUserValidation.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
     res.status(400).json({ errors: errorMessages });
     return;
    }
  
    next();
  };