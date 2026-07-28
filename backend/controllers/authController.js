const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, mobileNumber, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    // Return user data with token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    console.log("Login received:", login);

    // Find user by email or mobile number
    const user = await User.findOne({
      $or: [
        { email: login },
        { mobileNumber: login },
      ],
    });

    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Compare password
    const match = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password match:", match);

    if (!match) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    // Login successful
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Export Controllers
module.exports = {
  registerUser,
  loginUser,
};