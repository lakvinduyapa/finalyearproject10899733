import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import User from "../models/User.js"; 

// Create a new post
export const createPostController = asyncHandler(async (req, res) => {
  const { title, description, link, images } = req.body;
  // Check user role
  const user = await User.findById(req.userAuthId);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (!user.isSeller && !user.isAdmin) {
    res.status(403);
    throw new Error("Only sellers or admins can create posts");
  }

  const post = await Post.create({
    title,
    description,
    link,
    images: req.file.path,
    user: req.userAuthId,
  });

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post,
  });
});

// Get all posts
export const getAllPostsController = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    posts,
  });
});

// Get a single post
export const getSinglePostController = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", "name email");

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.status(200).json({
    success: true,
    post,
  });
});

// Update a post
export const updatePostController = asyncHandler(async (req, res) => {
    const { title, description, link, images } = req.body;
  
    const post = await Post.findById(req.params.id);
  
    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }
  
    // Check if the user is the owner or an admin
    const user = await User.findById(req.userAuthId);
  
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
  
    if (post.user.toString() !== user._id.toString() && !user.isAdmin) {
      res.status(403);
      throw new Error("You are not authorized to update this post");
    }
  
    // Now update
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, link, images },
      { new: true, runValidators: true }
    );
  
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  });
  
  // Delete a post
  export const deletePostController = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
  
    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }
  
    // Check if the user is the owner or an admin
    const user = await User.findById(req.userAuthId);
  
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
  
    if (post.user.toString() !== user._id.toString() && !user.isAdmin) {
      res.status(403);
      throw new Error("You are not authorized to delete this post");
    }
  
    await post.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  });
  