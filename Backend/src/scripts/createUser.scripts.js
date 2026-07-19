

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const User = require("../models/user.model");

const createUser = async () => {
  try {
    // Connect Database
    await connectDB();

    const name = "Rohan";
    const email = "rohan@gmail.com";
    const password = "123456";

    // Check Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("❌ User already exists.");
      process.exit();
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ User Created Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createUser();