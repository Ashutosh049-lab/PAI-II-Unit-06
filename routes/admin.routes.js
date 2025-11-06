
const router = require("express").Router();

const { getReport } = require("../controllers/admin.controller");
const { auth, isAdmin } = require("../middlewares/auth.middleware");

router.get("/reports", auth, isAdmin, getReport);

module.exports = router;
