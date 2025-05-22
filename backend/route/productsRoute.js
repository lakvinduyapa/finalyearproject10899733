import express from "express";
import { createproductcontoller, getproductcontroller, getsingleproductcontroller, updateproductcontroller, deleteproductcontroller, getLatestProductsController } from "../controllers/productscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";
import isSeller from "../middlewares/isSeller.js";

const productRoutes = express.Router();

productRoutes.post('/', isLoggedIn, isSeller, upload.array('files'), createproductcontoller);
productRoutes.get("/latest", getLatestProductsController);
productRoutes.get('/', getproductcontroller);
productRoutes.get('/:id',  getsingleproductcontroller);
productRoutes.put('/:id',  isLoggedIn, isAdmin, isSeller, updateproductcontroller);
productRoutes.delete('/:id/delete',  isLoggedIn, isSeller, deleteproductcontroller);
export default productRoutes;