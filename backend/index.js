const express = require("express");
const app = express();

// Importing routes
const authRoute = require("./routes/auth");

// Middleware
app.use(express.json());

// Route Middlewares
app.use("/auth", authRoute);

app.listen(80, () => console.log("Server is running."));
