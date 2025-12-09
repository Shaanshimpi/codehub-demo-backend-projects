// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4005, ()=>{
        console.log("listening to 4005")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Task = mongoose.model("task",{
    title: String,
    description: String,
    status: String,
    dueDate: String
})


app.get('/tasks',async (req, res)=>{
    const responce = await Task.find()
    res.send(responce)
})


app.post('/tasks',async (req, res)=>{
    const data = req.body
    const responce = await Task.create(data)
    res.send(responce)
})

