// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4000, ()=>{
        console.log("listening to 4000")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Blog = mongoose.model("blog",{
    title: String,
    description: String,
    date:String
})


app.get('/blogs',async (req, res)=>{
    const responce = await Blog.find()
    res.send(responce)
})


app.post('/blogs',async (req, res)=>{
    const data = req.body
    const responce = await Blog.create(data)
    res.send(responce)
})

