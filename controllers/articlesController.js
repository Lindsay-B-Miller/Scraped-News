var express = require("express");
var router = express.Router();
var db = require("../models")
var axios = require("axios");
var cheerio = require("cheerio");



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

// GET route for scraping the adventure.com website
router.get("/scrape", function (req, res) {
    axios.get("http://adventure.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("div.clickable").each(function (i, element) {
            var results = [];
            var articleLink = $(element).attr("data-href")
            var articleTitle = $(element).find("div.card-section").find("h3").find("a").text();
            var articlePicture = $(element).find("div.card-img").find("a").find("img").attr("data-lazy-src");
            console.log(articleTitle);
            console.log(articleLink);
            console.log(articlePicture)

            results.push({ link: "http://adventure.com/" + articleLink, title: articleTitle, picture: articlePicture, saved: false });


            db.Article.create(results)
                .then(function (dbArticle) {
                    console.log(dbArticle)
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        res.send("Scrape Complete");
    });
});



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


// Route for getting all Articles from the db
router.get("/articles/", function (req, res) {
    var id = req.body.id
    db.Article.findOne({ _id: id })
        .populate("notes")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Route for getting all Articles from the db
router.get("/articles/", function (req, res) {
    db.Article.find({}, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(found);
        }
    });
});

// Route for getting an Article from the db
router.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle)
        })
        .catch(function (err) {
            res.json(err);
        });
});


router.delete("/notes/", function (req, res) {
    var id = req.body.id
    db.Note.findOne(
        {
            _id: id
        })
        .then(function (dbArticle) {
            console.log(dbArticle)
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.delete("/articles", function (req, res) {
    db.Article.remove({}
    ).then(function (dbArticle) {
        console.log(dbArticle)
        res.json(dbArticle);
    })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = router;