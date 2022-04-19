import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  userName: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
    minlength: 3,
    maxlength: 15,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.createJWT = function() {
return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

export default mongoose.model("user", userSchema);
