import express from "express";
import { loginusercontroller, registerusercontroller, getUserProfilecontroller } from "../controllers/userscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = express.Router();

userRoutes.post('/register', registerusercontroller);
userRoutes.post('/login', loginusercontroller);
userRoutes.get('/profile',isLoggedIn, getUserProfilecontroller);

export default userRoutes;