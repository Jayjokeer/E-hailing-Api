import { ObjectId } from "mongoose";
import { UserRole, UserStatus } from "../enum/user.enum";

export interface IUser {
    _id: any;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    status: UserStatus;
    password: string;
    longitude: number;
    latitude: number;
    vehicle: string;
    plateNumber: string;
    color: string;
    role: UserRole;
    isAvailable: boolean;
}
export interface ILoggedInUser {
    id: any;
    email: string;
    role: UserRole;
}