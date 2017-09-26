// scrape button event handler
$(document).on('click', '#scrape-btn', function (e) {
  e.preventDefault();

  // clear current entries inside columns
  $.ajax({
    method: "GET",
    url: "/scrape",
    dataType: "json",
  }).done(function (data) {
    // loop through data and create panels
    // alert user that scrape is complete
    console.log(data);
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
