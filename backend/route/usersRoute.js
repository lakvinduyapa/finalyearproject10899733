import express from "express";
import { loginusercontroller, registerusercontroller } from "../controllers/userscontroller.js";

const userRoutes = express.Router();

userRoutes.post('/api/v1/users/register', registerusercontroller);
userRoutes.post('/api/v1/users/login', loginusercontroller);

export default userRoutes;