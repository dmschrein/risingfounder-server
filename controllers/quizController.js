const Quiz = require('../models/Quiz')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all quiz submissions
// @route GET /quizzes
// @access Private
const getAllQuizzes= asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find().select('-password').lean()
  if (!quizzes) {
    return res.status(400).json({message: 'No quizzes found'})
  }
  res.json(quizzes)
})

// @desc Create new quiz submission
// @route POST /quizzes
// @access Private
const createNewQuiz = asyncHandler(async (req, res) => {
  const {industryCategories, companyValues, marketingGoals, marketingPlatforms, marketingPainpoints, marketingPainpointsWhy, brandPersonality, firstName, lastName, company, email} = req.body

  // Confirm data
  if (!industryCategories || !companyValues || !marketingGoals || !marketingPlatforms || !marketingPainpoints || !marketingPainpointsWhy || !brandPersonality || !firstName || !lastName || !company || !email) {
    return res.status(400).json({message: 'All fields are required'})
  }

  // Check for duplicate
  const duplicate = await Quiz.findOne({ email }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email"})
  }

  const quizObject = { industryCategories, companyValues, marketingGoals, marketingPlatforms, marketingPainpoints, marketingPainpointsWhy, brandPersonality, firstName, lastName, company, email }

  // Create and store new quiz
  const quiz = await Quiz.create(quizObject)

  if (quiz) {
    res.status(201).json({ message: `New quiz ${email} created`})
  } else {
    res.status(400).json({ message: 'Invalid quiz data received'})
  }
})

// @desc Update a quiz
// @route PATCH /quizzes
// @access Private


// @desc Delete a quiz
// @route DELETE /quizzes
// @access Private