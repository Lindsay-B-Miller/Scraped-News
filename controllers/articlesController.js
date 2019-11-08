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
})

router.put("/articles/", function (req, res) {
    var id = req.body.id
    console.log(req.body);
    db.Article.update(
        { _id: id },
        { $set: { saved: true } },
        function (data) {

            res.json(data);
        }
    );
});


router.get("/saved", function (req, res) {
    db.Article.find({
        saved: true
    }, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            var articles = {
                article: found
            }
        }
        res.render("saved", articles)
    });
})

router.post("/articles/", function (req, res) {
    var id = req.body.id
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: id }, {
                $push: { note: dbNote._id }
            }, { new: true });
        }).then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;