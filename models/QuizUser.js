const mongoose = require("mongoose");

const { Schema } = mongoose;

const QuizUserSchema = new Schema({
  industryCategories: {
    type: [String],
  },
  companyValues: {
    type: [String],
  },
  marketingGoals: {
    type: [String],
  },
  marketingPlatforms: {
    type: [String],
  },
  marketingPainpoints: {
    type: [String],
  },
  marketingPainpointsWhy: {
    type: [String],
  },
  brandPersonality: {
    type: [String],
  },
  firstName: {
    type: [String],
  },
  lastName: {
    type: [String],
  },
  company: {
    type: [String],
  },
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
    required: true,
  },
});

const QuizUserModel = mongoose.model("QuizUser", QuizUserSchema);

module.exports = QuizUserModel;
