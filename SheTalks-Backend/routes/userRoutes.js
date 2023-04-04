const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validateSession");

const {
  registerUser,
  loginUser,
  landingPage,
  getUserProfile,
  updateUserProfile,
  getEvents,
  getUserInfo,
  getAuser,
} = require("../controllers/userControllers");

const {
  getPosts,
  postPost,
  postComment,
  likePost,
  getPost,
  unlikePost,
  checkLiked,
  countLikes,
} = require("../controllers/postControllers");


// ********************  Pages  ********************//
router.get("/", landingPage);
router.get("/checkConnected", validateSession, (req, res) => {
  res.json({ message: "user connected" });
});


//********************  Users  ********************//
router.post("/SignUp", registerUser);
router.post("/LogIn", loginUser);
router.get("/userInfo", validateSession, getUserInfo);
router.route("/Auser/:id").get(getAuser);
router.route("/Profile").get(getUserProfile).put(updateUserProfile);

router.route("/logout").get((req, res) => {
  res.clearCookie("session");
  res.json({ message: "User is logged out" });
});


//********************  Events  ********************//
router.route("/Events").get(getEvents);


//********************  Posts  ********************//
router.route("/Posts").get(validateSession, getPosts);
router.route("/Post/:id").get(getPost);
router.route("/Poster").post(postPost);
router.route("/commenter/:id").post(postComment);
router.route("/likePost/:id").get(likePost);
router.route("/unlikePost/:id").get(unlikePost);
router.route("/checkLiked/:id").get(checkLiked);
router.route("/countLikes/:id").get(countLikes);

module.exports = router;
