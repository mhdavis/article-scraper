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
router.delete("/saved", ArticleController.removeEntry);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                  NOTE METHODS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ==================================================
//  RETRIEVE ARTICLE NOTES
// ==================================================
router.get("/notes/:articleId", ArticleController.retrieveNotes);

// ==================================================
//  CREATE NOTE ENTRY
// ==================================================
router.post("/notes/:articleId", ArticleController.createNote);

// ==================================================
//  DELETE NOTE ENTRY
// ==================================================
router.delete("/notes/:articleId", ArticleController.deleteNote);

// ==================================================
// POST NEW NOTE TO ARTICLE
// ==================================================
router.post("/notes/:articleId", ArticleController.createNote);

// ==================================================
// DELETE A SPECIFIC NOTE FROM AN ARTICLE
// ==================================================
router.delete("/notes/:articleId/:noteId", ArticleController.deleteNote);

module.exports = router;
