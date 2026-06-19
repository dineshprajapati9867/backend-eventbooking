import express from "express";
import { createReservation} from "../controllers/reservation.controller.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/",auth, createReservation);

export default router;