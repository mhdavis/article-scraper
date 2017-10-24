const request = require("request");
const cheerio = require("cheerio");
const Note = require("../models/Note.js");
const Article = require("../models/Article.js");

const ArticleController = {};

// ==================================================
// SCRAPE ARTICLES
// ==================================================
ArticleController.scrape = function (req, res) {
  request("https://www.vox.com/policy-and-politics", function (err, response, html) {
    if (err) throw err;
    // scrape articles and display them for all to see
    const articles = [];

    const $ = cheerio.load(html);
    $("h2.c-entry-box--compact__title").each(function (i, element) {
      const title = $(element).text();
      const link = $(element).children('a').attr('href');

      const result = {
        title: title,
        link: link
      };

      articles.push(result);
    });
    res.json(articles);
  });
}

// ==================================================
//  DISPLAY HOMEPAGE
// ==================================================
ArticleController.displayHome = function (req, res) {
  res.render('index');
}

// ==================================================
// RETRIEVE SAVED ARTICLES
// ==================================================
ArticleController.retrieveSavedArticles = function (req, res) {
  Article.find({}, function (err, doc) {
    if (err) {
      throw err;
    } else {
      let ArticlesObj = {
        articles: doc
      }
      res.render('saved', ArticlesObj);
    }
  });
}

// ==================================================
//  CREATE ARTICLE ENTRY
// ==================================================
ArticleController.createEntry = function (req, res) {
  Article.find({ title: req.body.title }, function (err, doc) {
    if (err) throw err;

    if (doc.length === 0) {
      let entry = new Article(req.body);

      entry.save(function (error, doc) {
        if (error) throw error;
        res.json(doc);
      });
    } else {
      res.send(`Saved Article: "${req.body.title}" Already Exists!`);
    }
  });
}

// ==================================================
//  REMOVE ARTICLE ENTRY
// ==================================================
ArticleController.removeEntry = function (req, res) {
  Article.remove({
    _id: req.body.id
  }, function (err, data) {
    if (err) {
      throw err;
    }
    res.json(data);
  });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                  NOTE METHODS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ==================================================
//  RETRIEVE ARTICLE NOTES
// ==================================================
ArticleController.retrieveNotes = function (req, res) {
  Article.findOne({
    "_id": req.params.articleId
  }, function (err, article) {
    if (err) {
      throw error;
    } else {
      res.json(article);
    }
  });
}

// ==================================================
//  CREATE NOTE ENTRY
// ==================================================
ArticleController.createNote = function (req, res) {

  Article.findOne({
    "_id": req.params.articleId
  }, function (err, article) {
    if (err) {
      throw err;
    } else {
      let note = {
        text: req.body.text,
      };

      article.notes.push(note);

      article.save(function (error) {
        if (error) {
          throw error;
        }
        res.json(article);
      });
    }
  });

}

// ==================================================
//  DELETE NOTE ENTRY
// ==================================================
ArticleController.deleteNote = function (req, res) {

  Article.findById(req.params.articleId, function (err, article) {
    article.notes.id(req.params.noteId).remove();

    article.save(function (error) {
      if (error) throw error;
      res.send(`Note ID: ${req.params.noteId} Deleted`);
    });
  });
}

module.exports = ArticleController;
