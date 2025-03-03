const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const restaurantModel = require('./schema')
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log(err);
})

app.get("/user",async(req,res)=>{
    try {
        const user = await restaurantModel.find();
        res.status(200).json({message:user});
    } catch (err) {
        console.log(err);
        res.status(400).json({message:'Internal Server error'});
    }
})

app.get("/user/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const user = await restaurantModel.findByid(id);
        res.status(200).json({message:user});
    } catch (err) {
        console.log(err);
        res.status(400).json({message:'Internal Server Error'})
    }
})

app.post("/user",async(req,res)=>{
    try {
        const{name,location,cuisine,rating,menu}=req.body;
        if(!name || !location || !cuisine || !rating || !menu){
            res.status(400).json({message:'Name,location,cuisine,rating,menu not found'})
        }
        const user = new restaurantModel({name,location,cuisine,rating,menu})
        res.status(200).json({Message:'Name,location,cuisine,rating,menu is Created'})
    } catch (err) {
        console.log(err);
        res.status(400).json({message:'Internal Sever Error'})
    }
})

app.put("/user/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const user = await restaurantModel.findByidAndUpdate(id,req.body,{new:true});
        await save.user();
        res.status(201).json({message:'Updated Successfully'})
    } catch (err) {
        console.log(err);
        res.status(400).json({message:'internal Server Error'})
    }
})

app.delete("/user/:id",async(req,res)=>{
    try {
        const id = req.params.id
        const user = await restaurantModel.findByidAndDelete(id);
        res.status(200).json({message:'Deleted Successfully'})
    } catch (err) {
        console.log(err);
        res.status(400).json({message:'Internal Server Error'})  
    }
})

const PORT = process.env.PORT || 5000
app.listen(process.env.PORT,()=>{
    try {
        console.log(`Server is running on PORT: ${PORT}`);
    } catch (err) {
        console.log(err);
    }
})
