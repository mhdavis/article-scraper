// scrape button event handler
$(document).on('click', '#scrape-btn', function (e) {
  e.preventDefault();

  // clear current entries inside columns

  $.ajax({
    method: "GET"
    url: "/scrape"
  }).done(function (data) {
    // loop through data and create panels
    // alert user that scrape is complete
  });

});

// save article button event handler
$(document).on('click', '.save-btn' function (e) {
  // extract information about Article

  // pass data up to route via ajax call
  $.ajax({
    method: "POST"
    url: "/"
  }).done(function (data) {
    // alert user article has been saved

  });
});
