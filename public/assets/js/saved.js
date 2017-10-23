// ======================================
// GET ARTICLE NOTES
// ======================================
$(document).on('click', '.article-notes-btn', function (e) {

  e.preventDefault();

  const articleId = $(this)
  .parents(".scraper-card")
  .attr("data-id");

  $.ajax({
    method: "GET",
    url: `notes/${articleId}`,
    dataType: "json",
    success: function (data) {
      // clear notes container ul
      $(".notes-container").html('');

      let notes = data.notes;
      let $deleteBtn = $("<button>")
      .addClass("btn btn-danger")
      .text("X");

      notes.forEach(function (note, index) {
        let $li = $("<li>")
        .attr("note-id", note._id)
        .attr("note-index", index)
        .text(note.text);

        $li.append($deleteBtn);

        $(".notes-container").append($li);
        return;
      });

      // Append article title to modal
      $(".modal-title")
      .attr("data-id", data._id)
      .text(data.title);

      $("#myModal").modal({
        show: true
      });
    }
  });

});

// ======================================
// REMOVE ARTICLE
// ======================================
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

// ======================================
// CREATE ARTICLE NOTE
// ======================================
$(document).on("click", ".save-note-btn", function (e) {
  const articleId = $(".modal-title").attr("data-id");
  const text = $(".note-input").val();

  const noteText = {
    text: text
  }

  $.ajax({
    method: "POST",
    url: `notes/${articleId}`,
    dataType: "json",
    data: noteText,
    success: function (data) {
      console.log("NOTE ADDED TO ARTICLE!");
      console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });

});

// ======================================
// DELETE ARTICLE NOTE
// ======================================
