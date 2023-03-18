const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Routes
app.use("/", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);



    
