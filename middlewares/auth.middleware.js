
const jwt=require("jsonwebtoken");
const User=require("../models/user.model");

 const auth=async(req,res,next)=>{

    try{
        const raw=req.headers.authorization || "";
        const token=raw.startsWith("Beare") ? raw.slice(7):null;

        if(!token) return res.status(401).send({message:"Missing token"});

        const payload=jwt.verify(token,process.env.JWT_SECRET);

        const user=await User.findById(payload.id).lean();

        if(!user) return res.status(401).send({message:"Invalid token"});

        req.user={id:user._id,name:user.name,email:user.email,role:user.role};

        next();


    } catch(err){
       return res.status(401).send({message:"Unauthorized"});

    }
 }


 const isAdmin=(req,res,next)=>{
    if(req.user?.role !=="admin") return res.status(401).send({message:"Admin only"});
    next();
 }


 module.exports={auth,isAdmin}
