const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");

router.get("/scrape", function (req, res) {
  request("https://www.vox.com/policy-and-politics", function (error, response, html) {

    const $ = cheerio.load(html);

    $("h2.c-entry-box--compact__title a").each(function (i, element) {
      const result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      let entry = new Article(result);

      entry.save(function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      });
    });
  });

  res.send("Scrape Complete");
});

module.exports = router;
