// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4008, ()=>{
        console.log("listening to 4008")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Event = mongoose.model("event",{
    name: String,
    date: String,
    location: String,
    type: String
})


app.get('/events',async (req, res)=>{
    const responce = await Event.find()
    res.send(responce)
})


app.post('/events',async (req, res)=>{
    const data = req.body
    const responce = await Event.create(data)
    res.send(responce)
})

