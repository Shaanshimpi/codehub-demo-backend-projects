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
    app.listen(4102, () => {
      console.log('events rsvp listening on 4102')
    })
  })
  .catch((msg) => console.log('error:', msg))

// collections
const Event = mongoose.model('event', {
  name: String,
  date: String,
  location: String,
  type: String,
})

const Attendee = mongoose.model('attendee', {
  eventId: String,
  name: String,
  email: String,
  status: String,
})

// events
app.get('/events', async (req, res) => {
  const response = await Event.find()
  res.send(response)
})

app.post('/events', async (req, res) => {
  const data = req.body
  const response = await Event.create(data)
  res.send(response)
})

// attendees
app.get('/attendees', async (req, res) => {
  const response = await Attendee.find()
  res.send(response)
})

app.post('/attendees', async (req, res) => {
  const data = req.body
  const response = await Attendee.create(data)
  res.send(response)
})

