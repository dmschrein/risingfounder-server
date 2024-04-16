const express = require('express')
const cors = require('cors')
const app = express()
const User = require("./models/User")
const QuizUser = require("./models/QuizUser")
const blogs = require('./blog/blogsData.json')
require('dotenv').config()
const { mongoose } = require('mongoose')

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN || "http://localhost:5173"
  })
)

mongoose.connect(process.env.MONGO_URL)
console.log(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('Test Works')
})

// Register Route
app.post("/register", async(req, res) => {
  const {username, email, password, firstName, lastName, company, marketingGoals, marketingPlatforms, marketingPainpoints, marketingPainpointsWhy} = req.body
  try {
    const userInfo = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      company,
      marketingGoals,
      marketingPlatforms,
      marketingPainpoints,
      marketingPainpointsWhy
    })
    res.json(userInfo)
  } catch (error) {
    res.status(422).json(error)
  }
})

// Submit Route
app.post("/submit", async(req, res) => {
  const {industryCategories, companyValues, marketingGoals, marketingPlatforms, marketingPainpoints, marketingPainpointsWhy, brandPersonality, firstName, lastName, company, email, username, password} = req.body
  try {
    const quizUserInfo = await QuizUser.create({
      industryCategories,
      companyValues,
      marketingGoals,
      marketingPlatforms,
      marketingPainpoints,
      marketingPainpointsWhy,
      brandPersonality,
      firstName,
      lastName,
      company,
      email,
      username,
      password
    })
    res.json(quizUserInfo)
  } catch (error) {
    res.status(422).json(error)
  }
})

app.get('/blogs', (req, res) => {
  res.send(blogs)
})
app.get('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id)
  const blog = blogs.filter(b => b.id === id);
  // console.log(blog)
  res.send(blog)
})

// subscribe route
app.post('/subscribe', async (req, res) => {
  const {email} = req.body;
  if (!email) {
    return res.status(400).send('Email is required.')
  }
  try {
    const newEmail = new EmailInfo({ email })
    await newEmail.save()
    res.status(201).send('Subscription successful.')
  } catch (error) {
    if (error.code === 11000) {
      req.status(409).send('Email already subscribed.')
    } else {
      res.status(500).send('Error subscribing email.')
    }
  }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});