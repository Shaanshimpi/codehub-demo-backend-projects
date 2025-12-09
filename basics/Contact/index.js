// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4007, ()=>{
        console.log("listening to 4007")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Contact = mongoose.model("contact",{
    name: String,
    phone: String,
    email: String,
    address: String
})


app.get('/contacts',async (req, res)=>{
    const responce = await Contact.find()
    res.send(responce)
})


app.post('/contacts',async (req, res)=>{
    const data = req.body
    const responce = await Contact.create(data)
    res.send(responce)
})

