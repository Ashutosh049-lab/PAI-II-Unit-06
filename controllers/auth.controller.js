
const bcrypt =require("bcryptjs");
const  jwt =require("jsonwebtoken");
const User=require ("../models/user.model");
const { sendEmail, templates } =require("../utils/sendEmail");

 const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).send({ message: "name, email, password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).send({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash, role });

    
    await sendEmail({ to: email, subject: "Welcome to Eventify", html: templates.welcome(name) });

    res.status(201).send({ message: "user registered successfully" });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).send({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.send({ message: "login successful", token });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};



module.exports={register,login};
