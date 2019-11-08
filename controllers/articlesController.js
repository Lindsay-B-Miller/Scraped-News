var express = require("express");
var router = express.Router();
var db = require("../models")

router.get("/", function (req, res) {
    db.Article.find({}, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            var articles = {
                article: found
            }
        }
        res.render("index", articles)
    });

    // res.render("index");

})

module.exports = router;