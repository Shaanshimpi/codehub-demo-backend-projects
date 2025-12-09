// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4010, ()=>{
        console.log("listening to 4010")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Movie = mongoose.model("movie",{
    title: String,
    director: String,
    genre: String,
    year: String
})


app.get('/movies',async (req, res)=>{
    const responce = await Movie.find()
    res.send(responce)
})


app.post('/movies',async (req, res)=>{
    const data = req.body
    const responce = await Movie.create(data)
    res.send(responce)
})

