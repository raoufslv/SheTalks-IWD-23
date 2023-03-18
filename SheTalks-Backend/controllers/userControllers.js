const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Event = require("../models/eventModel");
const Post = require("../models/postModel");
const comment = require("../models/commentaireModel");
const like = require("../models/likeModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ****************************** USER registrations ******************************

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, phone } = req.body;
  if (!username || !email || !password) {
    return res.status(400);
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    return res.status(400);
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    ...req.body,
  });

  console.log(`User created ${user}`);
  if (user) {
    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "60d" }
    );
    return res.status(201).json({
      _id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      userType: user.userType,
      token: token,
    });
  } else {
    return res.status(400);
  }
});

// ****************************** USER login ******************************

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400);
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("User found");
    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "60d" }
    );
    return res.json({ user: user.username, email: user.email, token });
  } else {
    return res.status(401);
  }
});

// ****************************** USER profile ******************************

//@desc Get user profile
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log("req.user.id", req.user._id);
  const user = await User.findById(req.user.id); // aprés changer body
  if (user) {
    console.log("User found");
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// ****************************** USER update profile ******************************

//@desc Update user profile
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// ****************************** USER landing page ******************************

//@desc Landing page
//@route GET /api/users/
//@access public
const landingPage = asyncHandler(async (req, res) => {
  res.json({ message: "Welcome User to the landing page" });
});

// ****************************** USER events ******************************
//@desc Get all events
//@route GET /api/users/events
//@access public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

// ****************************** USER posts ******************************
//@desc Get all posts
//@route GET /api/users/posts
//@access public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

// ****************************** USER post post ******************************
//@desc Post a post
//@route POST /api/users/poster
//@access public
const postPost = asyncHandler(async (req, res) => {
  const { title, description, Anonyme, typeofPost } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const post = await Post.create({
    title,
    description,
    user: "64140f5eba0987cccc8ef1f2",
    Anonyme,
    typeofPost,
  });

  if (post) {
    res.status(201).json(post);
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
  const { post } = req.body;
  if (!post) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const like = await like.create({
    user: req.user._id,
    post: req.post._id,
  });

  if (like) {
    res.status(201).json({ _id: like.id, text: like.text });
  } else {
    res.status(400);
    throw new Error("Like data was not valid");
  }
  res.json({ message: "Post the like" });
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

module.exports = {
  registerUser,
  loginUser,
  landingPage,
  getUserProfile,
  updateUserProfile,
  getEvents,
  getPosts,
  postPost,
  postComment,
  likePost,
  getPost,
};
