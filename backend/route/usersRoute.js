import express from "express";
import { loginusercontroller, registerusercontroller, getUserProfilecontroller, updateShippingAddresscontroller, getAllUsersController } from "../controllers/userscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";


const userRoutes = express.Router();

userRoutes.post('/register', registerusercontroller);
userRoutes.post('/login', loginusercontroller);
userRoutes.get('/profile',isLoggedIn, getUserProfilecontroller);
userRoutes.put('/update/shippingaddress',isLoggedIn, updateShippingAddresscontroller);
userRoutes.get('/', isLoggedIn, isAdmin, getAllUsersController);

export default userRoutes;