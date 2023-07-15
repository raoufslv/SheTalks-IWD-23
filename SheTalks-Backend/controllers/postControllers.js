const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const sessions = require("../models/sessions");
const Like = require("../models/likeModel");
const comment = require("../models/commentaireModel");
const mongoose = require("mongoose");

//@desc Get user ID from session
//@route GET /api/users/userid
//@access public
const getUserID = asyncHandler(async (session_id) => {
  const session = await sessions.findOne({ session: session_id });
  return session.userId;
});

// ****************************** USER posts ******************************
//@desc Get all posts
//@route GET /api/users/posts
//@access public
const getPosts = asyncHandler(async (req, res) => {
  // find all posts and sort them by date
  const posts = await Post.find({}).sort({ createdAt: -1 });

  if (posts) {
    res.json({ message: "found", posts: posts });
  } else {
    res.json({ message: "not found" });
  }
});

// ****************************** USER post post ******************************
//@desc Post a post
//@route POST /api/users/poster
//@access public
const postPost = asyncHandler(async (req, res) => {
  const { title, story, feeling, tags, anonymous } = req.body;
  if (!title || !story || !feeling || !tags || !anonymous) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  // recupérer l'id de l'utilisateur connecté depuis le cookie
  const session_id = req.cookies.session;
  const session = await sessions.findOne({ session: session_id });
  const user_id = session.userId;
  console.log("user_id", user_id);
  const post = await Post.create({
    title,
    description: story,
    feeling,
    tags,
    anonymous,
    user_id: new mongoose.Types.ObjectId(user_id),
  });

  if (post) {
    res.status(201).json({ message: "Post data was not valid", post: post });
  } else {
    res.status(400).json({ message: "Post data was not valid" });
  }
});

// ****************************** USER post comment ******************************
//@desc Post a comment
//@route POST /api/users/commenter
//@access public
const postComment = asyncHandler(async (req, res) => {
  const { text, Anonyme } = req.body;
  try {
  } catch (error) {}
  if (!text) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const comment = await comment.create({
    text,
    user: req.user._id,
    post: req.post._id,
    Anonyme,
  });

  if (comment) {
    res.status(201).json({ _id: comment.id, text: comment.text });
  } else {
    res.status(400);
    throw new Error("Comment data was not valid");
  }
});

// ****************************** USER like ******************************
//@desc Like a post
//@route POST /api/users/like
//@access public
const likePost = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  getUserID(req.cookies.session).then(async (user_id) => {
    const like = await Like.create({
      user: new mongoose.Types.ObjectId(user_id),
      post: new mongoose.Types.ObjectId(post_id),
    });
    if (like) {
      res.status(201).json({ message: "liked" });
    } else {
      res.status(400);
      throw new Error("Like data was not valid");
    }
  });
});

// ****************************** USER get post ******************************
//@desc Get a post
//@route GET /api/users/post
//@access public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.post._id);
  if (post) {
    console.log("Post found");
    res.json({
      id: post._id,
      title: post.title,
      description: post.description,
      user: post.user,
      Anonyme: post.Anonyme,
      typeofPost: post.typeofPost,
    });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// ****************************** USER unlike ******************************
//@desc Unlike a post
//@route POST /api/users/unlike
//@access public
const unlikePost = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  getUserID(req.cookies.session).then(async (user_id) => {
    const like = await Like.findOneAndDelete({
      user: new mongoose.Types.ObjectId(user_id),
      post: new mongoose.Types.ObjectId(post_id),
    });
    if (like) {
      res.status(201).json({ message: "unliked" });
    } else {
      res.status(400);
      throw new Error("Like data was not valid");
    }
  });
});

// ****************************** USER check liked ******************************
//@desc Check if a post is liked
//@route POST /api/users/checkliked
//@access public
const checkLiked = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  getUserID(req.cookies.session).then(async (user_id) => {
    const like = await Like.findOne({
      user: new mongoose.Types.ObjectId(user_id),
      post: new mongoose.Types.ObjectId(post_id),
    });
    if (like) {
      res.status(201).json({ message: "liked" });
    } else {
      res.status(201).json({ message: "not liked" });
    }
  });
});

// ****************************** USER count likes ******************************
//@desc Count likes of a post
//@route POST /api/users/countlikes
//@access public
const countLikes = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const likes = await Like.find({ post: new mongoose.Types.ObjectId(post_id) });
  if (likes) {
    res.status(201).json({ message: "liked", likes: likes.length });
  } else {
    res.status(201).json({ message: "not liked", likes: 0 });
  }
});

module.exports = {
  getPosts,
  postPost,
  postComment,
  likePost,
  getPost,
  unlikePost,
  checkLiked,
  countLikes,
};
