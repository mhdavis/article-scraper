const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Express app
// =======================================================
let app = express();
let PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
// =======================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
// =======================================================
app.use(express.static("public"));

// Set Handlebars
// =======================================================
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs(
  { defaultLayout: "main",
    layoutsDir: "./app/views/layouts"
  })
);
app.set('views', './app/views');
app.set("view engine", "handlebars");


// Import routes and give the server access to them.
// =======================================================
let routes;
app.use("/", routes);
