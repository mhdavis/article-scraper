// scrape button event handler
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
      let $articleLink = $("<a>").attr("href", article.link);
      let $cardHeader = $("<h3>").addClass("card-header").text(article.title);
      let $cardBlock = $("<div>").addClass("card-block");
      let $pullRight = $("<div>").addClass("pull-right");
      let $saveButton = $("<a>").addClass("save-article-btn scraper-btn btn btn-success").attr("href", "#").text("Save");
      let $deleteButton = $("<a>").addClass("delete-article-btn scraper-btn btn btn-danger").attr("href", "#").text("Delete");

      // append article link to card
      $articleLink.append($cardHeader);
      $card.append($articleLink);

      // append card block w/ buttons to card
      $cardBlock.append($pullRight);
      $pullRight.append($saveButton);
      $pullRight.append($deleteButton);
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

// save article button event handler
$(document).on('click', '.save-article-btn', function (e) {
  // extract information about Article
  e.preventDefault();
  const title = $(this)
  .parent()
  .parent()
  .siblings()[0]
  .innerText;

  const link = $(this)
  .parent()
  .parent()
  .parent()
  .children("a")[0]
  .href;

  const line = $(this)
  .parent()
  .parent()
  .children(".card-text")[0]
  .innerText;

  const savedArticle = {
    title: title,
    line: line,
    link: link,
    note: []
  }

  console.log(savedArticle);

  // pass data up to route via ajax call
  // $.ajax({
  //   method: "POST",
  //   url: "/",
  //   dataType: "json",
  //   data: null,
  // }).done(function (data) {
  //   // alert user article has been saved
  //   console.log(data);
  // });

});
