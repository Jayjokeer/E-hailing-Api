import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/error";
import { catchAsync } from "../errors/error-handler";
import { successResponse } from "../helpers/success-response";
import { comparePassword, hashPassword } from "../utils/encryption";
import { NextFunction, Request, Response } from "express";
import { generateJWTwithExpiryDate } from "../utils/jwt";
import * as authService from "../services/user.service";
import * as rideService from "../services/rides.service";
import { JwtPayload } from "jsonwebtoken";

export const createRideController = catchAsync( async (req: JwtPayload, res: Response) => {
   try{
    const {
      pickup, 
      destination, 
    } = req.body;

    const userId = req.user._id;
    const ridePayload= {
      pickup, 
      destination, 
      userId 
    }
    const ride = await rideService.createRides(ridePayload);

      const data = ride;
      return successResponse(res,StatusCodes.CREATED, data);
    }catch(error){
        console.error('Error during ride creation:', error);
        throw new BadRequestError("Internal server error");
    }
});

export const fetchRidesController = catchAsync( async (req: Request, res: Response): Promise<void> => {
    try {
     const rides = await rideService.fetchAllRides();
       successResponse(res, StatusCodes.OK, rides);
    } catch (error) {
      console.error('Error during fetching available rides:', error);
      throw new BadRequestError('Internal server error')
      ;}
  });