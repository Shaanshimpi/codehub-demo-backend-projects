// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4002, ()=>{
        console.log("listening to 4002")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const User = mongoose.model("user",{
    name: String,
    email: String,
    age: String,
    role: String
})


app.get('/users',async (req, res)=>{
    const responce = await User.find()
    res.send(responce)
})


app.post('/users',async (req, res)=>{
    const data = req.body
    const responce = await User.create(data)
    res.send(responce)
})
