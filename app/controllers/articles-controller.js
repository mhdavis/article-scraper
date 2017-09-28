const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const Article = require("../models/Article.js");
const router = express.Router();

// ROUTE
// route for scraping articles and then sending scraped articles to front end
// to be displayed via jquery
router.get("/scrape", function (req, res) {
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
});


// HOME ROUTES
router.get("/", function (req, res) {
  res.render('index');
});

router.post("/", function (req, res) {
  let entry = new Article(req.body);

  entry.save(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
    res.json(doc);
  });
});

// SAVED ARTICLES ROUTES
router.get("/saved", function (req, res) {
  Article.find({}, function (error, doc) {
    if (error) {
      console.log(error)
    } else {
      console.log("=========== DOC ============");
      console.log(doc);
      console.log("============================");
      let ArticlesObj = {
        articles: doc
      }
      res.render('saved', ArticlesObj);
    }
  });
});

router.delete("/saved", function (req, res) {
  Article.remove({
    _id: req.body.id
  }, function (error, data) {
    if (!error) {
      res.json(data);
    } else {
      console.log(error);
    }
  });

});

module.exports = router;
