// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4006, ()=>{
        console.log("listening to 4006")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Post = mongoose.model("post",{
    title: String,
    content: String,
    author: String,
    date: String
})


app.get('/posts',async (req, res)=>{
    const responce = await Post.find()
    res.send(responce)
})


app.post('/posts',async (req, res)=>{
    const data = req.body
    const responce = await Post.create(data)
    res.send(responce)
})

