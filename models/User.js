const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({

  username: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    required: true,
    unique: false,
  },
  password: { 
    type: String, 
    required: true 
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
  },
  marketingGoals: {
    type: String,
  },
  marketingPlatforms: {
    type: String,
  },
  marketingPainpoints: {
    type: String,
  },
  marketingPainpointsWhy: {
    type: String,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
