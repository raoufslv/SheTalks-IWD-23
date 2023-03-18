const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");


const { registerUser, loginUser, landingPage, getUserProfile, updateUserProfile, getEvents, getPosts, postPost, postComment, likePost, getPost } = require("../controllers/userControllers");

router.get("/", landingPage);

// check user if he is logged in or not 
router.post("/SignUp", registerUser);

router.post("/LogIn", loginUser);

router.route("/Profile").get(getUserProfile).put(updateUserProfile);

router.route("/Events").get(getEvents);

router.route("/Posts").get(getPosts);

router.route("/Post/:id").get(getPost);

router.route("/Poster").post(postPost);


router.route("/commenter/:id").post(postComment);

router.route("/like/:id").post(likePost);

router.route("/logout").get((req, res) => {
    res.clearCookie("token");
    res.json({ message: "User is logged out" });
});




module.exports = router;
