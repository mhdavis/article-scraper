const express = require("express");
const router = express.Router();
const Note = require("../models/Note.js");
const Article = require("../models/Article.js");

// route (get method)
router.get("/:id", function (req, res) {
  Article.findOne({
    "_id": req.params.id
  }).populate("notes").exec(function (error, doc) {
    if (error) {
      console.log(error);
    } else {
      console.log("========== NOTES GET ========");
      console.log(doc);
      console.log("=============================");
      res.json(doc);
    }
  });
});

// route (method post) for making a post request
// to a specific saved article
// object's notes section
router.post("/", function (req, res) {
  // get the article id

  // create a new note for the article
});

// route (method delete) for making a delete request
// to a specific note
router.delete("/:id", function (req, res) {
 // get article id
});

module.exports = router;
