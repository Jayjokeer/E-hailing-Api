import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/error";
import { catchAsync } from "../errors/error-handler";
import { successResponse } from "../helpers/success-response";
import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import * as rideService from "../services/rides.service";
import { JwtPayload } from "jsonwebtoken";
import { RidesStatus } from "../enum/rides.enum";
import { matchRiderWithDriver } from "../helpers/location-matcher";

export const createRideController = catchAsync( async (req: JwtPayload, res: Response) => {
    const {
      pickup, 
      destination, 
      pickupLatitude,
      pickupLongitude,
      destinationLatitude,
      destinationLongitude,
    } = req.body;

    const userId = req.user.id;
    const ridePayload= {
      pickup, 
      destination, 
      userId,
      pickupLatitude,
      pickupLongitude,
      destinationLatitude,
      destinationLongitude,
    }
    const ride = await rideService.createRides(ridePayload);

      const data = ride;
      return successResponse(res,StatusCodes.CREATED, data);

});

export const fetchRidesController = catchAsync( async (req: Request, res: Response) => {
     const rides = await rideService.fetchAllRides();
      return successResponse(res, StatusCodes.OK, rides);

  });
  export const cancelRideController = catchAsync( async (req:JwtPayload, res: Response) => {
      const {id} = req.params;
      const ride = await rideService.fetchRideById(id);
      if(!ride){
        throw new NotFoundError("Ride not found")
      };
      if(String(ride.userId) !== String(req.user.id)){
        throw new BadRequestError("You can only cancel your ride")
      };
      if(ride.status === RidesStatus.completed){
        throw new BadRequestError("You cannot cancel a completed ride")
      }
      ride.status = RidesStatus.canceled;
      await ride.save();
       successResponse(res, StatusCodes.OK, ride);
  });

export const acceptRideController = catchAsync( async (req:JwtPayload, res: Response) => {
      const {id} = req.params;
      const ride = await rideService.fetchRideById(id);
      if(!ride){
        throw new NotFoundError("Ride not found")
      };
      if(ride.status === RidesStatus.accepted){
        throw new BadRequestError("Ride already accepted")
      };
      if(ride.status !== RidesStatus.pending){
        throw new BadRequestError("You can only accept a pending ride")
      };
      const driver = await userService.fetchUserById(req.user.id);
      if(!driver){
        throw new NotFoundError("Driver not found");
      }
      ride.status = RidesStatus.accepted;
      ride.driverId = req.user.id;
      driver.isAvailable = false;
      await ride.save();
      await driver.save();
      return successResponse(res, StatusCodes.OK, ride);
  });
  export const completeRideController = catchAsync( async (req:JwtPayload, res: Response) => {
      const {id} = req.params;
      const ride = await rideService.fetchRideById(id);
      if(!ride){
        throw new NotFoundError("Ride not found")
      };
      if(String(ride.driverId) !== String(req.user.id)){
        throw new BadRequestError("You can only complete your ride")
      };      
      
      if(ride.status !== RidesStatus.accepted){
        throw new BadRequestError("You can only accept a complete a ride you accepted")
      }
      const driver = await userService.fetchUserById(req.user.id);
      if(!driver){
        throw new NotFoundError("Driver not found");
      }
      ride.status = RidesStatus.completed;
      ride.fare = 2000;
      driver.isAvailable = true;
      await ride.save();
      await driver.save();

      return successResponse(res, StatusCodes.OK, ride);

  });
  export const matchRideController = catchAsync( async (req:JwtPayload, res: Response) => {
      const { latitude, longitude } = req.body;
      const riderLocation = { latitude: Number(latitude), longitude: Number(longitude) };
      const driver = await matchRiderWithDriver(riderLocation);
      return successResponse(res, StatusCodes.OK,  driver);
 
  });
  export const fetchUserRidesController = catchAsync( async (req:JwtPayload, res: Response) => {
      const userId = req.user.id;
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  
      const {rides, totalRides} = await rideService.fetchUserRides(page, limit, userId);
  
      const data = {
        page,
        limit,
        totalRides,
        rides,
      };
    return  successResponse(res, StatusCodes.OK,  data);
  });