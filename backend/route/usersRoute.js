import express from "express";
import { registerusercontroller } from "../controllers/userscontroller.js";

const userRoutes = express.Router();

userRoutes.post('/api/v1/users/register', registerusercontroller);

export default userRoutes;