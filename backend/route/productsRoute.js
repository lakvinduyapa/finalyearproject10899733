import express from "express";
import { createproductcontoller, getproductcontroller } from "../controllers/productscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productRoutes = express.Router();

productRoutes.post('/', isLoggedIn, createproductcontoller);
productRoutes.get('/',  getproductcontroller);
export default productRoutes;