import express from "express";
import { createPostController, getAllPostsController, getSinglePostController, deletePostController, updatePostController } from "../controllers/postscontroller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
import postupload from "../config/postUpload.js";

const postRoutes = express.Router();

// // Middleware to allow either seller OR admin
// const isSellerOrAdmin = (req, res, next) => {
//     if (req.user.isSeller || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403);
//       throw new Error("Access denied, only sellers or admins allowed");
//     }
//   };

postRoutes.post("/", isLoggedIn, postupload.single("file"), createPostController);
postRoutes.get("/", getAllPostsController);
postRoutes.get("/:id", getSinglePostController);
postRoutes.delete("/:id", isLoggedIn, isAdmin, deletePostController);
postRoutes.put("/:id", isLoggedIn, isAdmin, updatePostController);

export default postRoutes;
