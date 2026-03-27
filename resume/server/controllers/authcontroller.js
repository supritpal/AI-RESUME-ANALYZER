let User = require("../models/user");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
require("dotenv").config();
let secret = process.env.SECRET;

exports.signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "user already exist" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);

    let u = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let existinguser = await User.findOne({ email });

    if (!existinguser) {
      return res.status(400).json({ message: "User not found" });
    }

    let isMatch = await bcrypt.compare(password, existinguser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let token = jwt.sign({ id: existinguser._id }, secret, { expiresIn: "7d" });

    res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
