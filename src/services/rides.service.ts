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

export const fetchUserRides = async(page: number, limit: number, userId: string)=>{
    const skip = (page -1) * limit;

    const rides =  Ride.find({userId}).skip(skip).limit(limit).sort({ rideDate: -1 });
    const totalRides = Ride.countDocuments({userId});
    return {rides , totalRides  }
}