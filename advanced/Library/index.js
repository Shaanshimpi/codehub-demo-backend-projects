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
    app.listen(4100, () => {
      console.log('library service listening on 4100')
    })
  })
  .catch((msg) => console.log('error:', msg))

// collections
const Author = mongoose.model('author', {
  name: String,
  bio: String,
  country: String,
})

const Book = mongoose.model('book', {
  title: String,
  authorId: String,
  genre: String,
  publishedYear: String,
})

const Member = mongoose.model('member', {
  name: String,
  email: String,
  joinedAt: String,
})

// authors
app.get('/authors', async (req, res) => {
  const response = await Author.find()
  res.send(response)
})

app.post('/authors', async (req, res) => {
  const data = req.body
  const response = await Author.create(data)
  res.send(response)
})

// books
app.get('/books', async (req, res) => {
  const response = await Book.find()
  res.send(response)
})

app.post('/books', async (req, res) => {
  const data = req.body
  const response = await Book.create(data)
  res.send(response)
})

// members
app.get('/members', async (req, res) => {
  const response = await Member.find()
  res.send(response)
})

app.post('/members', async (req, res) => {
  const data = req.body
  const response = await Member.create(data)
  res.send(response)
})
