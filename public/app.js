// Global Variables
var articleId;

$(document).on("click", ".saveBtn", function () {
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    $.ajax({
        method: "PUT",
        url: "/articles/",
        data: {
            id: thisId
        }
    }).then(function (data) {
        console.log(data);
    })
})

$(document).on("click", ".saveNote", function () {
    var thisId = $(this).attr("data-id");
    console.log("this is the ID on the save note form: " + thisId)
    console.log("Article Id from within modal: " + articleId)

    $.ajax({
        method: "POST",
        url: "/articles/",
        data: {
            id: articleId,
            title: $(".titleInput").val(),
            body: $(".bodyInput").val()
        }
    }).then(function (data) {
        console.log(data);
    })
});

$(document).on("click", ".scrapeArticles", function () {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function (data) {
        location.reload()
        console.log(data);
    })
});

$(document).on("click", ".deleteNote", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/notes",
        data: {
            id: thisId
        }
    }).then(function (data) {
        location.reload()
        console.log(data);
    })
});

$(document).on("click", ".clearArticles", function () {
    $.ajax({
        method: "DELETE",
        url: "/articles",
    }).then(function (data) {
        location.reload()
        console.log(data);
    })
});

$(document).on("click", ".addNote", function () {
    articleId = $(this).attr("article-id")
    console.log(articleId)
});

$(document).on("click", ".viewNote", function () {
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function (data) {
        console.log("get request ran");
        console.log(data)
        $(".noteBody").empty()
        if (data.note) {
            for (i = 0; i < data.note.length; i++) {
                var card = $("<div class='card w-50'>");
                var cardBody = ("<div class='card-body'>");
                var cardTitle = ("<h5 class='card-title'>" + data.note[i].title);
                // var cardBody = ("<p class='card-text'>" + data.note[i].body + "</p>");
                cardBody.append(cardTitle);
                // cardBody.append(cardBody);
                card.append(cardBody);
                $(".noteBody").append(card)
            }
            // // Place the title of the note in the title input
            // $(".noteTitle").append(data.note.title);
            // // Place the body of the note in the body textarea
            // $(".noteBody").append(data.note.body);
        }
        else {
            $(".noteBody").append("Sorry, there are no notes for this article! Please create a note");
        }
    })
});
