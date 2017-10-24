// ======================================
// GET ARTICLE INFO INTO MODAL
// ======================================
$(document).on('click', '.article-notes-btn', function (e) {

  $(".note-input").val('');

  const articleId = $(this)
  .parents(".scraper-card")
  .attr("data-article-id");

  $.ajax({
    method: "GET",
    url: `notes/${articleId}`,
    dataType: "json",
    success: function (data) {
      // clear notes container ul
      $(".notes-container").html('');

      let notes = data.notes;

      notes.forEach(function (note, index) {
        let $li = $("<li>")
        .addClass("note-item")
        .attr("data-note-id", note._id)
        .attr("data-note-index", index)
        .text(note.text);

        let $deleteBtn = $("<button>")
        .addClass("delete-note-btn btn btn-danger")
        .attr("data-note-id", note._id)
        .attr("data-note-index", index)
        .text("X");
        $li.append($deleteBtn);

        $(".notes-container").append($li);
        return;
      });

      // Append article title to modal
      $(".modal-title")
      .attr("data-article-id", data._id)
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

  const id = $(this)
  .parents(".scraper-card")
  .attr("data-article-id");

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
  const articleId = $(".modal-title").attr("data-article-id");
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
      $(".note-input").val('');
      // create an li for the new note
      // give the li the notes-id prop
      // give the li the notes-index prop
      // append it to the ul for the article

      let notes = data.notes;
      let note = notes[notes.length - 1];
      let $deleteBtn = $("<button>")
      .addClass("delete-note-btn btn btn-danger")
      .attr("data-note-id", note._id)
      .attr("data-note-index", notes.length - 1)
      .text("X");

      let $li = $("<li>")
      .addClass("note-item")
      .attr("data-note-id", note._id)
      .attr("data-note-index", notes.length - 1)
      .text(note.text);

      $li.append($deleteBtn);
      $(".notes-container").append($li);
    },
    error: function (err) {
      console.log(err);
    }
  });

});

// ======================================
// DELETE ARTICLE NOTE
// ======================================
$(document).on('click', '.delete-note-btn', function (e) {
  const articleId = $(this)
  .parents(".modal-content")
  .children(".modal-header")
  .children(".modal-title")
  .attr("data-article-id");

  const noteId = e.target.dataset.noteId;

  $.ajax({
    method: "DELETE",
    url: `notes/${articleId}/${noteId}`,
    success: function (data) {
      const noteItem = $(`[data-note-id=${noteId}]`)[0];
      noteItem.remove();
    },
    error: function (err) {
      console.log("Error: " + err);
    }
  });

});
