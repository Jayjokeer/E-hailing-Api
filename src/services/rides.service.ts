import { RidesStatus } from "../enum/rides.enum";
import Ride from "../model/rides.model";

export const createRides= async(ridePayload: any)=>{
    return await Ride.create(ridePayload);
};

export const fetchRideById = async(id: string)=>{
    return await Ride.findById(id);
};

export const fetchAllRides = async()=>{
    return await Ride.find({status: RidesStatus.pending});
};

