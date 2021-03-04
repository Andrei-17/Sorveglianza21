const express = require("express");
const app = express();
const mongoose = require('mongoose');

const dbName = 'sorveglianza';

//Database Connection
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true});

// Importing routes
const authRoute = require("./routes/auth");

// Middleware
app.use(express.json());

// Route Middlewares
app.use("/auth", authRoute);

app.listen(80, () => console.log("Server is running."));
