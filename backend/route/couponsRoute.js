import express from "express";
import { createcouponcontroller, getallcouponscontroller, getsinglecouponcontroller, updatecouponcontroller, deletecouponcontroller } from "../controllers/couponscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponRoutes = express.Router();

couponRoutes.post('/',isLoggedIn, isAdmin, createcouponcontroller);
couponRoutes.get('/', getallcouponscontroller);
couponRoutes.get('/:id', getsinglecouponcontroller);
couponRoutes.put('/:id',isLoggedIn, isAdmin, updatecouponcontroller);
couponRoutes.delete('/:id/delete',isLoggedIn, isAdmin, deletecouponcontroller);

export default couponRoutes;