const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const dbName = process.env.DB_NAME;

//Database Connection
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Importing routes
app.use(express.static("public"));
const authRoute = require("./routes/auth");
const sensorRoute = require("./routes/sensor");
const clientRoute = require("./routes/client");

// Middleware
app.use((req, res, next) => {
    if (req.originalUrl === "/sensor") {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});

// Route Middlewares
app.use("/auth", authRoute);
app.use("/sensor", sensorRoute);
app.use("/client", clientRoute);

app.listen(80, () => console.log("Server is running."));
