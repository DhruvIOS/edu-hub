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

module.exports = { signUpUser };
