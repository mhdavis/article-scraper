const express = require("express");
const router = express.Router();
const ArticleController = require("../controllers/article-controller.js");

// ==================================================
// SCRAPE ARTICLES
// ==================================================
router.get("/scrape", ArticleController.scrape);

// ==================================================
// SAVED ARTICLES
// ==================================================
router.get("/saved", ArticleController.retrieveSavedArticles);

// ==================================================
//  DISPLAY HOMEPAGE
// ==================================================
router.get("/", ArticleController.displayHome);

// ==================================================
//  CREATE ARTICLE ENTRY
// ==================================================
router.post("/", ArticleController.createEntry);

// ==================================================
//  REMOVE ARTICLE ENTRY
// ==================================================
router.delete("/", ArticleController.removeEntry);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                  NOTE METHODS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ==================================================
//  RETRIEVE ARTICLE NOTES
// ==================================================
router.get(":id/notes", ArticleController.retrieveNotes);

// ==================================================
//  CREATE NOTE ENTRY
// ==================================================
router.post(":id/notes", ArticleController.createNote);

// ==================================================
//  DELETE NOTE ENTRY
// ==================================================
router.delete(":id/notes", ArticleController.deleteNote);

// ==================================================
// POST NEW NOTE TO ARTICLE
// ==================================================
router.post("notes/:id", ArticleController.createNote);

// ==================================================
// DELETE A SPECIFIC NOTE FROM AN ARTICLE
// ==================================================
router.delete("notes/:id", ArticleController.deleteNote);

module.exports = router;
