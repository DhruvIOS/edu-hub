const admin = require("../firebaseAdmin");
const User = require("../models/Users"); // Correctly imported User model
const bcrypt = require("bcrypt");

const signUpUser = async (req, res) => {
  try {
    const { token, firstName, lastName, email, password, role } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid } = decodedToken;

    let user = await User.findOne({ uid });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ uid, firstName, lastName, email, password: hashedPassword, role });

      console.log("Attempting to save user to MongoDB:", newUser); // Add this log
      const savedUser = await newUser.save();
      console.log("User saved to MongoDB successfully:", savedUser); // Add this log

      return res.status(201).json({ message: "Successfully created account" });
    } else {
      return res.status(409).json({ message: "User with this Firebase UID already exists in our system." });
    }
  } catch (err) {
    console.error("Error during signup:", err); // Keep the general error log
    res.status(500).json({ message: "Error signing up" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Missing Firebase token." });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;

    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found in database." });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        uid: user.uid,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = { signUpUser, loginUser };
