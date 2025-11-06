
const Router=require("express");
const {createEvent,listEvents}=require("../controllers/event.controller");
const {auth,isAdmin}=require("../middlewares/auth.middleware");

const router=Router();


router.get("/",listEvents);
router.post("/",auth,isAdmin,createEvent);

module.exports=router;