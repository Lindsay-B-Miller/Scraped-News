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
})

