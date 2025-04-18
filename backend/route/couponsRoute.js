import express from "express";
import { createcouponcontroller, getallcouponscontroller, getsinglecouponcontroller, updatecouponcontroller, deletecouponcontroller } from "../controllers/couponscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const couponRoutes = express.Router();

couponRoutes.post('/',isLoggedIn, createcouponcontroller);
couponRoutes.get('/', getallcouponscontroller);
couponRoutes.get('/:id', getsinglecouponcontroller);
couponRoutes.put('/:id',isLoggedIn, updatecouponcontroller);
couponRoutes.delete('/:id/delete',isLoggedIn, deletecouponcontroller);

export default couponRoutes;