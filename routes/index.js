import express from "express";
import eventRoute from "./event.route.js";
import reservationRoute from "./reservation.route.js";
import bookingRoute from "./booking.route.js";
import auth from './auth.route.js'
const router = express.Router();

router.use("/events", eventRoute);
router.use("/reservations", reservationRoute);
router.use("/bookings", bookingRoute);
router.use("/auth", auth);

export default router;