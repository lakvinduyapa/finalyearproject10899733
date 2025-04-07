import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from "../route/usersRoute.js";
import productRoutes from "../route/productsRoute.js";
import categoryRoutes from "../route/categoriesRoute.js";
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js";
import reviewRoutes from "../route/reviewRoute.js";

//database connection
dbConnect();
const app =express();

app.use(express.json());
//routes
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/products",productRoutes);
app.use("/api/v1/categories",categoryRoutes);
app.use("/api/v1/reviews", reviewRoutes);

//error handling middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;