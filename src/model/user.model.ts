import mongoose, { Document, Schema } from 'mongoose';
import { UserRole, UserStatus } from '../enum/user.enum';
import { IUser } from '../interface/user.interface';

const userSchema: Schema = new mongoose.Schema(
  {
    firstName: { type: String ,required: true},
    lastName: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String , required: true},
    mobile: {type: String},
    status: {type: String, enum: UserStatus, default: UserStatus.active}, 
    longitude: {type: Number},
    latitude: {type: Number},
    isAvailable: {type: Boolean, default: true},
    vehicle: {type: String},
    plateNumber: {type: String},
    color: {type: String},
    role: {type: String, enum: UserRole}
  },
  { timestamps: true }

);

export default mongoose.model<IUser>('Users', userSchema);