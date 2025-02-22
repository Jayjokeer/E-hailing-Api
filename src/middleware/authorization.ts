import { NextFunction, Request, Response  } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../errors/error";
import { verifyJWT } from "../utils/jwt";
import * as authService from "../services/user.service";
import { UserRole } from "../enum/user.enum";

export const riderAuth = async (req: JwtPayload, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      throw new UnauthorizedError("Kindly login to access this route");
    }
  
    try {
      const decode = verifyJWT(token);
      if (!decode) {
        throw new UnauthorizedError("Authentication Failure");
      }

      if(decode.role !== UserRole.rider){
        throw new ForbiddenError("Access denied!")
      }
      req.user = decode;
      next();
      
    } catch (error) {
      next(error);
    }
  };
  export const driverAuth = async (req: JwtPayload, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      throw new UnauthorizedError("Kindly login to access this route");
    }
  
    try {
      const decode = verifyJWT(token);
      if (!decode ) {
        throw new UnauthorizedError("Authentication Failure");
      }

      if(decode.role !== UserRole.driver){
        throw new ForbiddenError("Access denied!")
      }
      req.user = decode;
      next();
      
    } catch (error) {
      next(error);
    }
  };