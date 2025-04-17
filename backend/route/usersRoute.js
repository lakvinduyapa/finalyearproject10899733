import express from "express";
import { loginusercontroller, registerusercontroller, getUserProfilecontroller, updateShippingAddresscontroller } from "../controllers/userscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = express.Router();

userRoutes.post('/register', registerusercontroller);
userRoutes.post('/login', loginusercontroller);
userRoutes.get('/profile',isLoggedIn, getUserProfilecontroller);
userRoutes.put('/update/shippingaddress',isLoggedIn, updateShippingAddresscontroller);

export default userRoutes;