import mongoose from "mongoose";
import validator from 'validator';

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
        validator: validator.isEmail ,
        message: 'Please provide a valid email'
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
  },
});

export default mongoose.model("user", userSchema);
