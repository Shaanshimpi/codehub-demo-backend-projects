// setup
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongo connected")
    app.listen(4001, ()=>{
        console.log("listening to 4001")
    })
}).catch(msg=>console.log("error:", msg))

// mongo 
const Product = mongoose.model("product",{
    name: String,
    price: String,
    description: String,
    category: String
})


app.get('/products',async (req, res)=>{
    const responce = await Product.find()
    res.send(responce)
})


app.post('/products',async (req, res)=>{
    const data = req.body
    const responce = await Product.create(data)
    res.send(responce)
})

