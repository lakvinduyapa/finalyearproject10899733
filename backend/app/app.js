import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from "../route/usersRoute.js";
import { globalErrorHandler } from "../middlewares/globalErrorHandler.js";
//database connection
dbConnect();
const app =express();

app.use(express.json());
//routes
app.use("/",userRoutes);

//error handling middleware
app.use(globalErrorHandler);
export default app;