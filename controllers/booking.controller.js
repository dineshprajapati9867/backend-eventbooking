import Reservation from "../models/reservation.model.js";
import seat from "../models/seat.model.js";
import Booking from "../models/booking.model.js";

export const createBooking = async (
  req,
  res
) => {
  try {
    const { reservationId } = req.body;

    const reservation =
      await Reservation.findById(
        reservationId
      );

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    if (
      reservation.expiresAt < new Date()
    ) {
      return res.status(400).json({
        message: "Reservation expired",
      });
    }

    await seat.updateMany(
      {
        eventId: reservation.eventId,
        seatNumber: {
          $in: reservation.seatNumbers,
        },
      },
      {
        status: "booked",
      }
    );

    const booking =
      await Booking.create({
        userId: reservation.userId,
        eventId: reservation.eventId,
        seatNumbers:
          reservation.seatNumbers,
      });

    await Reservation.findByIdAndDelete(
      reservationId
    );

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};