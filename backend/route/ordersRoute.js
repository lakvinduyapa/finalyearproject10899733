import express from "express";
import { createordercontroller, getallorderscontroller, getsingleordercontroller, updateordercontroller } from "../controllers/ordercontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRoutes = express.Router();

orderRoutes.post('/',isLoggedIn, createordercontroller);
orderRoutes.get('/',isLoggedIn, getallorderscontroller);
orderRoutes.get('/:id',isLoggedIn, getsingleordercontroller);
orderRoutes.put('/update/:id',isLoggedIn, updateordercontroller);
export default orderRoutes;