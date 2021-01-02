const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  
  try {
    const token = req.header("x-auth-token");
    
    if (!token) 
    return res
    .status(401)
    .json({ msg: "Authentication token doesn't exist" });

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken)
    return  res
    .status(401)
    .json({ msg: "Verification token has failed" });
    req.user = verifiedToken.id;
    next();

  } catch (err) {
    res.status(500).json({ error: errr.message });
  }
};

module.exports = auth;
