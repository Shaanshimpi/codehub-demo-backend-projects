// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4004, ()=>{
        console.log("listening to 4004")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Book = mongoose.model("book",{
    title: String,
    author: String,
    genre: String,
    pages: String
})


app.get('/books',async (req, res)=>{
    const responce = await Book.find()
    res.send(responce)
})


app.post('/books',async (req, res)=>{
    const data = req.body
    const responce = await Book.create(data)
    res.send(responce)
})

