

const Router=require("express");
const auth=require("../middlewares/auth.middleware");

const {bookTickets,cancelBooking} =require("../controllers/ticket.controller");

const router=Router();

router.post("/book",auth,bookTickets);
router.patch("/cancel/:id",auth,cancelBooking);

module.exports=router;