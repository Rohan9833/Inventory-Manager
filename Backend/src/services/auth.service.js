const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken.utils");

const loginUser = async (loginData) => {
  const { email, password } = loginData;

  // Validate input
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  // Find user
  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  // Compare password
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid Email or Password");
  }

  // Generate Token
  const token = generateToken(user._id);

  // Remove password
  const userData = user.toObject();
  delete userData.password;

  return {
    user: userData,
    token,
  };
};

module.exports = {
  loginUser,
};  