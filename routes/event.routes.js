
const router = require("express").Router();
const { createEvent, listEvents } = require("../controllers/event.controller");
const { auth, isAdmin } = require("../middlewares/auth.middleware");

router.get("/", listEvents);
router.post("/", auth, isAdmin, createEvent);

module.exports = router;
