import express from "express";
import { createordercontroller, getallorderscontroller, getsingleordercontroller, updateordercontroller, getorderstatscontroller, getSellerOrdersController, getStripeSuccessOrderController } from "../controllers/ordercontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isSeller from "../middlewares/isSeller.js";
import isAdmin from "../middlewares/isAdmin.js";

const orderRoutes = express.Router();

orderRoutes.post('/',isLoggedIn, createordercontroller);
orderRoutes.get('/',isLoggedIn, getallorderscontroller);
orderRoutes.get('/:id',isLoggedIn, getsingleordercontroller);
orderRoutes.put('/update/:id',isLoggedIn, updateordercontroller);
orderRoutes.get('/sales/stats',isLoggedIn, isAdmin, getorderstatscontroller);
orderRoutes.get("/seller/orders", isLoggedIn, isSeller, getSellerOrdersController);
orderRoutes.get("/stripe-success/:sessionId", getStripeSuccessOrderController);
export default orderRoutes;