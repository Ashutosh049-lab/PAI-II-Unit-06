
const Ticket = require ("../models/ticket.model");
const Event =require("../models/event.model");
const { sendEmail, templates }= require("../utils/sendEmail");

 const bookTickets = async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).send({ message: "Event not found" });

    const totalAmount = event.basePrice * Number(quantity);

    const ticket = await Ticket.create({
      userId: req.user.id,
      eventId,
      quantity,
      totalAmount
    });

    await sendEmail({
      to: req.user.email,
      subject: "Booking Confirmed",
      html: templates.booking({
        userName: req.user.name,
        eventName: event.name,
        quantity,
        totalAmount
      })
    });

    res.status(201).send({
      message: "Tickets booked successfully",
      bookingId: ticket._id,
      totalAmount
    });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

 const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate("eventId");
    if (!ticket) return res.status(404).send({ message: "Booking not found" });

    
    if (String(ticket.userId) !== String(req.user.id) && req.user.role !== "admin") {
      return res.status(403).send({ message: "Not allowed" });
    }

    ticket.status = "cancelled";
    await ticket.save();

   
    const payload = {
      userName: req.user.name,
      eventName: ticket.eventId.name
    };
    await sendEmail({
      to: req.user.email,
      subject: "Booking Cancelled",
      html: templates.cancel(payload)
    });
    if (process.env.SUPERADMIN_EMAIL) {
      await sendEmail({
        to: process.env.SUPERADMIN_EMAIL,
        subject: "User Booking Cancelled",
        html: templates.cancel(payload)
      });
    }

    res.send({ message: "Booking cancelled successfully" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

module.exports={bookTickets,cancelBooking};

