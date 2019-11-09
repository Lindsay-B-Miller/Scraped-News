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
    console.log(thisId)

    $.ajax({
        method: "POST",
        url: "/articles/",
        data: {
            id: thisId,
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