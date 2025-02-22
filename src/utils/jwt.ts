import { Request } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError, ForbiddenError } from "../errors/error";
import { ILoggedInUser, IUser } from "../interface/user.interface";
import { UserRole } from "../enum/user.enum";
import dotenv from 'dotenv';
dotenv.config();


export const generateJWTwithExpiryDate = (
  payload: ILoggedInUser
) => {
  const exp = Math.floor(Date.now() / 1000) + 1 * 24 * 60 * 60; 
  const userJWT = jwt.sign({ ...payload, exp }, process.env.JWT_SECRET!);

  return userJWT;
};

export const verifyJWT = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as ILoggedInUser;
    return payload;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new BadRequestError("Kindly log in!");
    } else {
      throw new BadRequestError("This token is invalid");
    }
  }
};