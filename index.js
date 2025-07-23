const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

const urlRouter = require('./routes/url');
const staticRoutes = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const { connctDB } = require('./connection');
const { restrictloggedInUsers, checkAuth } = require('./middlewares/auth');
const Url = require('./models/url');
const path = require('path');

// Database connection
connctDB(process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection failed:", err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/url", restrictloggedInUsers, urlRouter);
app.use("/", checkAuth , staticRoutes);
app.use("/user", userRoute);

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Redirection route
app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  try {
    const entry = await Url.findOneAndUpdate(
      { shortID },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
})