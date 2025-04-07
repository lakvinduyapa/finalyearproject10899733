import express from "express";
import { createreviewcontroller } from "../controllers/reviewscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/:productid", isLoggedIn, createreviewcontroller);

export default reviewRoutes;