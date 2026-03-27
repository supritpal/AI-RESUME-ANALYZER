let jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ message: "No token found" });
  }

  try {
    let decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
