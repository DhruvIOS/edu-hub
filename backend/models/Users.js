const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

    uid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: {
        type: String,
        required: true,
      },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["Professor", "Student", "TA", "professor", "student", "ta"], required: true },

})



module.exports = mongoose.model("User", UserSchema) ; 