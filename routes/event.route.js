import express from "express";
import {
  getEvents,
  getEventById,
  getEventSeats
} from "../controllers/event.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.get("/:eventId/seats", auth,getEventSeats);

export default router;