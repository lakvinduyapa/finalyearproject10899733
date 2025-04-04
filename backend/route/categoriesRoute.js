import express from "express";
import { createcategorycontroller, getcategoriescontroller, getcategorycontroller, updatecategorycontroller, deletecategorycontroller} from "../controllers/categoriescontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/", isLoggedIn, createcategorycontroller);
categoryRoutes.get("/", getcategoriescontroller);
categoryRoutes.get("/:id",  getcategorycontroller);
categoryRoutes.put("/:id", isLoggedIn, updatecategorycontroller);
categoryRoutes.delete("/:id/delete", isLoggedIn, deletecategorycontroller);
export default categoryRoutes;