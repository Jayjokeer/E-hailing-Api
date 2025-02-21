import { UserRole, UserStatus } from "../enum/user.enum";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    status: UserStatus;
    password: string;
    longitude: number;
    latitude: number;
    createdAt: Date;
    updatedAt: Date;
    vehicle: string;
    plateNumber: string;
    color: string;
    role: UserRole;
}