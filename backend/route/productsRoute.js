import express from "express";
import { createproductcontoller, getproductcontroller, getsingleproductcontroller, updateproductcontroller, deleteproductcontroller } from "../controllers/productscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productRoutes = express.Router();

productRoutes.post('/', isLoggedIn, createproductcontoller);
productRoutes.get('/',  getproductcontroller);
productRoutes.get('/:id',  getsingleproductcontroller);
productRoutes.put('/:id',  isLoggedIn, updateproductcontroller);
productRoutes.delete('/:id/delete',  isLoggedIn, deleteproductcontroller);
export default productRoutes;