const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const { findByIdAndDelete } = require("../models/userModel");
router.get("/test", (req, res) => {
  res.send("Hola mundo");
});
router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    //validar si existe el
    if (!email || !password || !passwordCheck)
      return res
        .status(400)
        .json({ msg: "There are empty fields"});

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password must have more than 5 characters"});

    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Passwords don't match" });
    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      return res.status(400).json({ msg: "This account already exists" });

    if (!displayName) displayName = email;

    //es necesairo hashear las contraseñas
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: passHash,
      displayName,
      adminUser:false
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "There are empty fields" });
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ msg: "This account is not registered" });
    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass)
      return res.status(400).json({ msg: "Incorrect password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        adminUser:user.adminUser        
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
    try {        
        const deletedUser= await User.findByIdAndDelete(req.user);        
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/tokenIsValid",async (req,res)=>{
    try {
        const token=req.header("x-auth-token");
        if(!token) return res.json(false);
        const verifiedToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!verifiedToken) return res.json(false);
        const user= await User.findById(verifiedToken.id)
        if(!user) return res.json(false);
        return res.json(true)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/",auth,async (req,res)=>{
const user= await User.findById(req.user);
res.json({
  displayName:user.displayName,
  id:user._id,
  adminUser:user.adminUser
});
});

module.exports = router;
