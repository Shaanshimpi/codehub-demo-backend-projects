// setup
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('mongo connected')
    app.listen(4101, () => {
      console.log('task manager listening on 4101')
    })
  })
  .catch((msg) => console.log('error:', msg))

// collections
const Project = mongoose.model('project', {
  name: String,
  description: String,
  status: String,
})

const Task = mongoose.model('task', {
  projectId: String,
  title: String,
  status: String,
  dueDate: String,
})

// projects
app.get('/projects', async (req, res) => {
  const response = await Project.find()
  res.send(response)
})

app.post('/projects', async (req, res) => {
  const data = req.body
  const response = await Project.create(data)
  res.send(response)
})

// tasks
app.get('/tasks', async (req, res) => {
  const response = await Task.find()
  res.send(response)
})

app.post('/tasks', async (req, res) => {
  const data = req.body
  const response = await Task.create(data)
  res.send(response)
})

