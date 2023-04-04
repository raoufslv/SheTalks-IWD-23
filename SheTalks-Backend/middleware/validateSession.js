// check if the user is logged in
const sessions = require("../models/sessions");

const validateSession = async (req, res, next) => {
  const sessionIdTemp = req.cookies.session;
  const Allsessions = await sessions.find({});
  const session = Allsessions.find(
    (session) => session.session === sessionIdTemp
  );
  if (!session) {
    return res.status(201).json({ data: "Unauthorized"});
  }
  next();
};

module.exports = validateSession;
