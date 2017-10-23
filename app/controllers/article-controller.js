const request = require("request");
const cheerio = require("cheerio");
const Note = require("../models/Note.js");
const Article = require("../models/Article.js");

const ArticleController = {};

// ==================================================
// SCRAPE ARTICLES
// ==================================================
ArticleController.scrape = function (req, res) {
  request("https://www.vox.com/policy-and-politics", function (error, response, html) {
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
  Article.find({}, function (error, doc) {
    if (error) {
      console.log(error)
    } else {
      console.log("===== SAVED ARTICLES =====");
      console.log(doc);
      console.log("==========================");
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
  Article.find({ title: req.body.title }, function (error, doc) {
    console.log("======= POST DOC =======");
    console.log(doc);
    console.log("========================");
    if (doc.length === 0) {
      let entry = new Article(req.body);

      entry.save(function (err, doc) {
        err ? console.log(err) : console.log(doc);
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
  }, function (error, data) {
    if (!error) {
      res.json(data);
    } else {
      console.log(error);
    }
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
  }, function (error, article) {
    if (error) {
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
      console.log(err);
    } else {
      let note = {
        text: req.body.text,
      };

      article.notes.push(note);

      article.save(function (error) {
        if (error) {
          console.log(err);
        } else {
          console.log("INSIDE THE ARTICLE.SAVE!");
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

  User.findById(req.params.id, function (err, article) {
    article[notes][req.body.index].remove();

    user.save(function (err) {
      if (err) throw err;
      res.send("Due Deleted");
    });
  });
}

module.exports = ArticleController;
