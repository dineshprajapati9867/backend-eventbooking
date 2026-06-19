import bookingModel from "../models/booking.model.js";
import Event from "../models/event.model.js";
import reservationModel from "../models/reservation.model.js";


export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ dateTime: 1 });

    res.status(200).json({
      count: events.length,
      data: events,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({

        message: "Event not found",
      });
    }

    res.status(200).json({
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEventSeats = async (
  req,
  res
) => {
  try {
    const { eventId } = req.params;

    const reservation =
      await reservationModel.findOne({
        eventId,
        userId: req.user.userId,
        expiresAt: {
          $gt: new Date(),
        },
      });

    const bookings =
      await bookingModel.find({
        eventId,
      });

    const bookedSeats =
      bookings.flatMap(
        (booking) => booking.seatNumbers
      );

    res.json({
      reservation,
      bookedSeats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};