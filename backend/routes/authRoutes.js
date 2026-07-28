const express =
  require("express");

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

console.log("registerUser:", typeof registerUser);
console.log("loginUser:", typeof loginUser);

const router =
  express.Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

module.exports = router;