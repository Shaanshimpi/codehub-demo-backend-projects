// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4003, ()=>{
        console.log("listening to 4003")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Car = mongoose.model("car",{
    make: String,
    model: String,
    year: String,
    color: String
})


app.get('/cars',async (req, res)=>{
    const responce = await Car.find()
    res.send(responce)
})


app.post('/cars',async (req, res)=>{
    const data = req.body
    const responce = await Car.create(data)
    res.send(responce)
})

