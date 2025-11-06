
 const Event=require("../models/event.model");

 const createEvent=async(req,res)=>{

    try{

        const {name,category,date,basePrice}=req.body;
        const event=await Event.create({name,category,date,basePrice});
        res.status(201).send(event);

    } catch(err){
       res.status(400).send({message:e.message});
    }
 }

 const listEvents=async(_req,res)=>{
    const events=await Event.find().sort({date:1});
    res.send(events);
 }

 module.exports={createEvent,listEvents};
 