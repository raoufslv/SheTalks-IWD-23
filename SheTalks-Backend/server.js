const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bodyParser = require("body-parser");

connectDb(); // connect to the database
const app = express(); // initialize express app
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 5000; // set port number

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Change this to your React app's URL
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json()); // to parse json data coming from the request body
app.use(cookieParser()); // to parse cookies coming from the request

//Routes
app.use("/", require("./routes/userRoutes")); // user routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); // start the server
