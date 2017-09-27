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

// ROUTE
// route from saving article button ajax call ('/', post route)
  // create mongodb entry with properties title, link, and empty notes array
router.post("/", function (req, res) {
  console.log(req.body);
  // let entry = new Article(result);
  //
  // entry.save(function (err, doc) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(doc);
  //   }
  // });
});


// TEMPORARY ROUTES FOR FRONTEND DEVELOPMENT
router.get("/", function (req, res) {
  res.render('index');
});

router.get("/saved", function (req, res) {
  res.render('saved');
});

module.exports = router;
