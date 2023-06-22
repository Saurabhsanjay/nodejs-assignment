const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
},
);

// Create the user model
const mongoUser = mongoose.model("User", userSchema);

module.exports = mongoUser;
