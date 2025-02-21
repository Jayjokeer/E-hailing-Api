import { RidesStatus } from "../enum/rides.enum";

export interface IRide extends Document {
    pickup: string;
    destination: string;
    userId: string;
    status: RidesStatus;
    driverId?: string;
    rideDate: Date;
    fare?: number;
  }