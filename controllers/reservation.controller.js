import seat from "../models/seat.model.js";
import Reservation  from "../models/reservation.model.js";

export const createReservation = async (req, res) => {
  try {
    const {  eventId, seatNumbers } = req.body;

    const seats = await seat.find({
      eventId,
      seatNumber: { $in: seatNumbers },
      status: "available",
    });

    if (seats.length !== seatNumbers.length) {
      return res.status(400).json({
        message: "Some seats are unavailable",
      });
    }

    await seat.updateMany(
      {
        eventId,
        seatNumber: { $in: seatNumbers },
      },
      {
        status: "reserved",
      }
    );

    const reservation = await Reservation.create({
      userId: req.user.userId,
      eventId,
      seatNumbers,
      expiresAt: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    });

    res.status(201).json({
      success: true,
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

