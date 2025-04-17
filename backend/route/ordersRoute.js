import express from "express";
import { createordercontroller, getallorderscontroller } from "../controllers/ordercontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRoutes = express.Router();

orderRoutes.post('/',isLoggedIn, createordercontroller);
orderRoutes.get('/',isLoggedIn, getallorderscontroller);
export default orderRoutes;