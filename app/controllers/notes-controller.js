const express = require("express");
const router = express.Router();
const Note = require("../models/Note.js");

// route (get method)
router.get("/saved/:id", function (req, res) {

});

// route (method post) for making a post request
// to a specific saved article
// object's notes section
router.post("/saved", function (req, res) {
  // get the article id

  // create a new note for the article
});

// route (method delete) for making a delete request
// to a specific note
router.delete("/saved", function (req, res) {
 // get article id
});
