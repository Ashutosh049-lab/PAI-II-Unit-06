
const router=require("express");
const getReport=require("../controllers/admin.controller");
const {auth,isAdmin} = require("../middlewares/auth.middleware");

const router=Router();

router.get("/reports",auth,isAdmin,getReport);

module.exports=router;