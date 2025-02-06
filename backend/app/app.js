import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from "../route/usersRoute.js";

dbConnect();
const app =express();

app.use(express.json());
//routes
app.use("/",userRoutes);

export default app;