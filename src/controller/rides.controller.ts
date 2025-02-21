import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/error";
import { catchAsync } from "../errors/error-handler";
import { successResponse } from "../helpers/success-response";
import { NextFunction, Request, Response } from "express";
import * as authService from "../services/user.service";
import * as rideService from "../services/rides.service";
import { JwtPayload } from "jsonwebtoken";
import { RidesStatus } from "../enum/rides.enum";

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
      throw new BadRequestError('Internal server error');
    }
  });
  export const cancelRideController = catchAsync( async (req:JwtPayload, res: Response): Promise<void> => {
    try {
      const {id} = req.params;
      const ride = await rideService.fetchRideById(id);
      if(!ride){
        throw new NotFoundError("Ride not found")
      };
      if(String(ride.userId) !== String(req.user._id)){
        throw new BadRequestError("You can only cancel your ride")
      };
      if(ride.status === RidesStatus.completed){
        throw new BadRequestError("You cannot cancel a completed ride")
      }
      ride.status = RidesStatus.canceled;
      await ride.save();
       successResponse(res, StatusCodes.OK, ride);
    } catch (error) {
      console.error('Error during cancel ride:', error);
      throw new BadRequestError('Internal server error');
    }
  });

export const acceptRideController = catchAsync( async (req:JwtPayload, res: Response): Promise<void> => {
    try {
      const {id} = req.params;
      const ride = await rideService.fetchRideById(id);
      if(!ride){
        throw new NotFoundError("Ride not found")
      };

      if(ride.status !== RidesStatus.pending){
        throw new BadRequestError("You can only accept a pending ride")
      }
      ride.status = RidesStatus.accepted;
      await ride.save();
       successResponse(res, StatusCodes.OK, ride);
    } catch (error) {
      console.error('Error during accepting ride:', error);
      throw new BadRequestError('Internal server error');
    }
  });
  export const completeRideController = catchAsync( async (req:JwtPayload, res: Response): Promise<void> => {
    try {
      const {id} = req.params;
      const ride = await rideService.fetchRideById(id);
      if(!ride){
        throw new NotFoundError("Ride not found")
      };
      if(String(ride.driverId) !== String(req.user._id)){
        throw new BadRequestError("You can only complete your ride")
      };      
      
      if(ride.status !== RidesStatus.accepted){
        throw new BadRequestError("You can only accept a complete a ride you accepted")
      }
      ride.status = RidesStatus.completed;
      await ride.save();
       successResponse(res, StatusCodes.OK, ride);
    } catch (error) {
      console.error('Error during accepting ride:', error);
      throw new BadRequestError('Internal server error');
    }
  });