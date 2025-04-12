const admin = require("../firebaseAdmin");
const User = require("../models/Users"); // Correctly imported User model
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
  try {
    const { token, firstName, lastName, email, password, role } = req.body;

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid } = decodedToken;

    // Check if the user already exists by Firebase UID
    let user = await User.findOne({ uid }); // Corrected to use User, not Users

    if (!user) {
      // A user with that UID already exists
      // No user with the entered UID was found
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        uid,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        
      });

      await newUser.save(); // Save to MongoDB

      return res.status(201).json({ message: "Successfully created account" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `${err}` });
  }
};

module.exports = { signupUser };
