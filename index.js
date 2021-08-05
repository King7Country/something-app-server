const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");

//environment variables
require('dotenv').config()

const users = require("./routes/api/users");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI; 

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log("err:", err));
  

  // Passport middleware
  app.use(passport.initialize());// Passport config
  require("./config/passport")(passport);// Routes
  app.use("/api/users", users);
  
  
  const port = process.env.PORT || 7887; 

  app.listen(port, () => console.log(`Running hard on port ${port} !`));