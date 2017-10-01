
// SAVED ARTICLE EVENT HANDLERS
  // event handler for `delete from saved` button
    // makes ajax call method delete

  // event handler from `article notes` button
    // makes ajax call method put

$(document).on('click', '.article-notes-btn', function (e) {
  e.preventDefault();
  // NOTE EVENT HANDLERS
  // event handler for save note button
  // extracts note text from text box
  // makes ajax request

  // $.ajax({
  //   method: "GET",
  //   url: "/saved",
  //   dataType: "json"
  // }).done(function (data) {
  //   // toggle model with information
  //   $("#myModal").modal({
  //     show: 'false'
  //   });

  $("#myModal").modal({
    show: true
  });

});

  // event handler for deleting a specific note
    // get note information
    // make ajax call (method delete)

$(document).on('click', '.article-remove-btn', function (e) {
  e.preventDefault();

  const id = $(this)
  .parents(".scraper-card")
  .attr("data-id");

  const ArticleId = {
    id: id
  };

  $.ajax({
    method: "DELETE",
    url: "/saved",
    dataType: "json",
    data: ArticleId,
    success: function(data) {
      console.log("IT WORKED! DELETED");
      alert("Article Deleted!");
      window.location.reload();
    }
  });
});
