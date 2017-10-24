// ======================================
// SCRAPE ARTICLES
// ======================================
$(document).on('click', '#scrape-btn', function (e) {
  e.preventDefault();

  // clear current entries inside columns
  $.ajax({
    method: "GET",
    url: "/scrape",
    dataType: "json",
  }).done(function (data) {
    $("#left-col").html('');
    $("#right-col").html('');

    // loop through data and create panels
    // alert user that scrape is complete
    data.forEach(function (article, index) {
      let $card = $("<div>").addClass("card scraper-card");
      let $articleLink = $("<a>").addClass("article-link").attr("href", article.link).attr("target", "_blank");
      let $cardHeader = $("<h3>").addClass("card-header").text(article.title);
      let $cardBlock = $("<div>").addClass("card-block");
      let $pullRight = $("<div>").addClass("pull-right");
      let $saveButton = $("<button>").addClass("save-article-btn btn btn-lg").text("Save");

      // append article link to card
      $articleLink.append($cardHeader);
      $card.append($articleLink);

      // append card block w/ buttons to card
      $cardBlock.append($pullRight);
      $pullRight.append($saveButton);
      $card.append($cardBlock);

      // if its an even entry append to left column
      // otherwise append to right column
      if (index % 2 == 0) {
        $("#left-col").append($card);
      } else {
        $("#right-col").append($card);
      }

      return false;
    });

    alert(`Scrape Complete! ${data.length} Articles Retrieved`);
  });

});

// ======================================
// SAVE ARTICLE
// ======================================
$(document).on('click', '.save-article-btn', function (e) {
  // extract information about Article
  e.preventDefault();

  const title = $(this)
  .parents(".scraper-card")
  .children(".article-link")
  .children(".card-header")[0]
  .innerText;

  const link = $(this)
  .parents(".scraper-card")
  .children(".article-link")[0]
  .href;

  const savedArticle = {
    title: title,
    link: link
  };

  // pass data up to route via ajax call
  $.ajax({
    method: "POST",
    url: "/",
    dataType: "json",
    data: savedArticle,
  }).done(function (data) {
    // alert user article has been saved
    alert("Article Saved!");
  });
});
