const mongoose = require("mongoose");

const {Schema} = mongoose;

const QuizSchema = new Schema({

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
  email: {
    type: String,
    required: true,
    unique: false,
  },
})

const QuizModel = mongoose.model("Quiz", QuizSchema)

module.exports = QuizModel;