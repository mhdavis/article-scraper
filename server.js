// DEPENDENCIES
// *******************************************************
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.promise = Promise;
// Scraping Tools
const request = require("request");
const cheerio = require("cheerio");
// Required Models
const Article = require("./app/models/Article.js");
const Note = require("./app/models/Note.js");

// Express app
// =======================================================
let app = express();
let PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
// =======================================================
// Use morgan and body parser with app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static directory
// =======================================================
app.use(express.static("public"));

// Set Handlebars
// =======================================================
app.engine("handlebars", exphbs(
  { defaultLayout: "main",
    layoutsDir: "./app/views/layouts"
  })
);
app.set('views', './app/views');
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// =======================================================
const articleRoutes = require("./app/controllers/articles-controller.js");
app.use("/", articleRoutes);

// Mongoose Connection
// =======================================================
mongoose.connect("localhost");
const db = mongoose.connection;

// mongoose errors
db.on("error", error => console.log(`Mongoose Error: ${error}`));
// on success db login
db.on("open", () => console.log("Mongoose connection successful."));
// listening on port 8080
app.listen(8080, () => console.log("App running on port 8080!"));
