const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("./model/usermodel.js");
const cookie = require("cookie");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ sucess: false, message: "PLease fill all fields" });
  }

  try {
    const existingUUser = await users.findOne({ email });
    if (existingUUser) {
      return res
        .status(400)
        .json({ sucess: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new users({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ sucess: true });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ sucess: false, message: "Email and password are required" });
  }
  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ sucess: false, message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ sucess: true });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ sucess: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
};
const isAuthenticated = (req, res, next) => {
  try {
    return res
      .status(200)
      .json({ sucess: true, message: "User is authenticated" });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

module.exports = {
  isAuthenticated,
  register,
  login,
  logout,
};
