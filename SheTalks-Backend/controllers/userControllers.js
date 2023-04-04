const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Event = require("../models/eventModel");
const sessions = require("../models/sessions");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
// ****************************** USER registrations ******************************

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { FirstName, LastName, phone, age, username, email, password } =
    req.body;
  if (
    !FirstName ||
    !LastName ||
    !phone ||
    !age ||
    !username ||
    !email ||
    !password
  ) {
    return res.status(400).json({ message: "one of the fields is empty" });
  }
  const emailAvailable = await User.findOne({ email }); // findOne returns the first document that matches the specified query criteria on the collection or view.
  if (emailAvailable) {
    return res.status(400).json({ data: "email is taken" });
  }
  const userAvailable = await User.findOne({ username });
  if (userAvailable) {
    return res.status(400).json({ data: "username is taken" });
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds (the higher the number the more secure the password)
  const user = await User.create({
    firstName: FirstName,
    lastName: LastName,
    phone,
    age,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    // const csrfToken = uuidv4(); // Generate a unique CSRF token
    const sessionId = uuidv4(); // Generate a unique session ID

    res.cookie("session", sessionId, {
      httpOnly: true, // The cookie only accessible by the web server (not by the client)
      //   // secure: true, // The cookie only accessible through HTTPS (not HTTP)
      //   // sameSite: "strict",
    });

    // store the session in the database
    const session = await sessions.create({
      session: sessionId,
      userId: user._id,
    });

    return res.status(201).json({
      data: "user created",
      user: {
        id: user._id,
        userType: user.userType,
      },
    });
  } else {
    return res.status(400).json({ data: "invalid user data" });
  }
});

// ****************************** USER login ******************************

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400);
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "no account" });
  }

  //compare password with hashedpassword
  if (await bcrypt.compare(password, user.password)) {
    // search the session in the database
    const user_id = user._id;
    const sess = sessions.findOne({ userId: user_id });

    sess.then((session) => {
      if (session) {
        res.cookie("session", session.session, {
          httpOnly: true, // The cookie only accessible by the web server (not by the client)
          //   // secure: true, // The cookie only accessible through HTTPS (not HTTP)
          //   // sameSite: "strict",
        });
        return res.status(201).json({
          message: "user logged in",
          user_id: user.user_id,
          userType: user.userType,
        });
      } else {
        const sessionId = uuidv4(); // Generate a unique session ID
        res.cookie("session", sessionId, {
          httpOnly: true, // The cookie only accessible by the web server (not by the client)
          //   // secure: true, // The cookie only accessible through HTTPS (not HTTP)
          //   // sameSite: "strict",
        });

        // store the session in the database
        const session = sessions.create({
          session: sessionId,
          userId: user._id,
        });
        return res.status(201).json({
          message: "user logged in",
          user_id: user.user_id,
          userType: user.userType,
          email: user.email,
          phone: user.phone,
          age: user.age,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    });
  } else {
    return res.status(401).json({
      message: "password incorrect",
    });
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



// ****************************** USER get user info ******************************
//@desc Get user info
//@route GET /api/users/userinfo
//@access public
const getUserInfo = asyncHandler(async (req, res) => {
  getUserID(req.cookies.session).then(async (user_id) => {
    const user = await User.findById(user_id);
    if (user) {
      res.status(201).json({
        message: "found",
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      res.status(201).json({ message: "not found" });
    }
  });
});

// ****************************** USER get user ID from session ******************************
//@desc Get user ID from session
//@route GET /api/users/userid
//@access public
const getUserID = asyncHandler(async (session_id) => {
  const session = await sessions.findOne({ session: session_id });
  return session.userId;
});

// ****************************** USER get a user ******************************
//@desc Get a user
//@route GET /api/users/auser
//@access public
const getAuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(201).json({
      message: "found",
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } else {
    res.status(201).json({ message: "not found" });
  }
});



module.exports = {
  registerUser,
  loginUser,
  landingPage,
  getUserProfile,
  updateUserProfile,
  getEvents,
  getUserInfo,
  getAuser,
};
