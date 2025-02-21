import mongoose, { Document, Schema } from 'mongoose';
import { RidesStatus } from '../enum/rides.enum';
import { IRide } from '../interface/rides.interface';

const RideSchema: Schema = new mongoose.Schema(
    {
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    status: { type: String, enum: RidesStatus, default: RidesStatus.pending },
    driverId: { type: Schema.Types.ObjectId, ref: 'Users' },
    rideDate: { type: Date, default: Date.now },
    fare: { type: Number }
  });
  
  export default mongoose.model<IRide>('Ride', RideSchema);
  