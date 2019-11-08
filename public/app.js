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