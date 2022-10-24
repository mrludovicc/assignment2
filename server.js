// grab environment variables
require("dotenv").config();
// IMPORT EXPRESS
const express = require("express");
// IMPORT DATABASE CONNECTION
const mongoose = require("./db/connection");
// IMPORT MERCED LOGGER
const { log } = require("mercedlogger");
//IMPORT MIDDLEWARE
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
// GET PORT FROM ENV OR DEFAULT PORT
const PORT = process.env.PORT || "2021";
const SECRET = process.env.SECRET || "secret"
const HomeRouter = require("./routes/home.js");
const aboutRouter = require("./routes/abouroute.js");
const projectRouter = require("./routes/projectRouter.js");
const servicesRouter = require("./routes/servicesRouter.js");
const contactRouter = require("./routes/contactRouter.js");
const expressLayouts = require('express-ejs-layouts')
// Sessions Middleware
const session = require("express-session"); // create session cookies
const connect = require("connect-mongodb-session")(session) // store cookies in mongo

/////////////////////////////////////
// Create Express Application Object
/////////////////////////////////////

const app = express();

/////////////////////////////////////
// Set the View Engine
/////////////////////////////////////
// Set Templating Engine
// app.use(expressLayouts)
// app.set('layout', './views/layouts/full-width')

// app.set('views', './views')
// app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')
/////////////////////////////////////
// Setup Middleware
/////////////////////////////////////
app.use(cors()); // Prevent Cors Errors if building an API
app.use(methodOverride("_method")); // Swap method of requests with _method query
app.use(express.static("public")); // serve the public folder as static
app.use(morgan("tiny")); // Request Logging
app.use(express.json()); // Parse json bodies
app.use(express.urlencoded({ extended: true })); //parse bodies from form submissions
// SESSION MIDDLEWARE REGISTRATION (adds req.session property)
const CONN=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ba4m2tv.mongodb.net/?retryWrites=true&w=majority`
app.use(
  session({
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    saveUninitialized: true, // create session regardless of changes
    resave: true, //save regardless of changes
    store: new connect({
      uri: CONN,
      databaseName: "sessions",
      collection: "sessions",
    }),
  })
);

/////////////////////////////////////
// Routes and Routers
/////////////////////////////////////

//HomeRouter
app.use("/", HomeRouter);
app.use('/about', aboutRouter)
app.use('/project', projectRouter)
app.use('/services', servicesRouter)
app.use('/contact', contactRouter)


/////////////////////////////////////
// App Listener
/////////////////////////////////////
app.listen(PORT, () =>
  log.white("🚀 Server Launch 🚀", `Listening on Port ${PORT}`)
);
