



const express = require("express");
const router = express.Router();

const { bookTickets, cancelBooking } = require("../controllers/ticket.controller");
const { auth } = require("../middlewares/auth.middleware");

router.post("/book", auth, bookTickets);
router.patch("/cancel/:id", auth, cancelBooking);

module.exports = router;
