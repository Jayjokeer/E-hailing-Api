import Ride from "../model/rides.model";

export const createRides= async(ridePayload: any)=>{
    return await Ride.create(ridePayload);
}