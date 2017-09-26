const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");

// ROUTE
// route for scraping articles and then sending scraped articles to front end
// to be displayed via jquery
router.get("/scrape", function (req, res) {
  request("https://www.vox.com/policy-and-politics", function (error, response, html) {
    // scrape articles and display them for all to see

    const $ = cheerio.load(html);

    $("h2.c-entry-box--compact__title a").each(function (i, element) {
      const result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

    });
  });

  res.json(result);

});

// ROUTE
// route from saving article button ajax call ('/', post route)
  // create mongodb entry with properties title, link, and empty notes array
router.post("/", function (req, res) {
  //     let entry = new Article(result);
  //
  //     entry.save(function (err, doc) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(doc);
  //       }
  //     });
  //   });
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
