// index.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { recipeRouter } from './routes/recipes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);


try {
    mongoose.connect(
    "mongodb+srv://prajnapn36:Pajji123@cluster0.s15lznn.mongodb.net/"); 
    console.log("MongoDB connected")
} catch (err) {
    console.log("Unable to connect");
}

app.listen(3001, () => console.log("server started"));