import { Router, Request, Response } from "express";
import * as rideController from "../controller/rides.controller";
import { validateMatchRequest, validateRideCreation } from "../validation/rides.validation";
import { driverAuth, riderAuth } from "../middleware/authorization";


const router = Router();


router.route("/create").post(riderAuth, validateRideCreation,rideController.createRideController);
router.route("/").get(driverAuth, rideController.fetchRidesController);
router.route("/:id/accept").patch(driverAuth, rideController.acceptRideController);
router.route("/:id/complete").patch(driverAuth, rideController.completeRideController);
router.route("/:id/cancel").patch(riderAuth, rideController.cancelRideController);
router.route("/match").post(riderAuth,validateMatchRequest, rideController.matchRideController);


export { router as RideRoute };
