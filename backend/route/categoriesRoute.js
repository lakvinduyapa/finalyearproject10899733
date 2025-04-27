import express from "express";
import { createcategorycontroller, getcategoriescontroller, getcategorycontroller, updatecategorycontroller, deletecategorycontroller} from "../controllers/categoriescontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import categoryupload from "../config/categoryUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/", isLoggedIn, isAdmin, categoryupload.single("file"),  createcategorycontroller);
categoryRoutes.get("/", getcategoriescontroller);
categoryRoutes.get("/:id",  getcategorycontroller);
categoryRoutes.put("/:id", isLoggedIn, isAdmin, updatecategorycontroller);
categoryRoutes.delete("/:id/delete", isLoggedIn, isAdmin, deletecategorycontroller);
export default categoryRoutes;