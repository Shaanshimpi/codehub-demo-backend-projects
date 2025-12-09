// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4009, ()=>{
        console.log("listening to 4009")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Note = mongoose.model("note",{
    title: String,
    content: String,
    category: String,
    createdAt: String
})


app.get('/notes',async (req, res)=>{
    const responce = await Note.find()
    res.send(responce)
})


app.post('/notes',async (req, res)=>{
    const data = req.body
    const responce = await Note.create(data)
    res.send(responce)
})

