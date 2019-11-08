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

// GET route for scraping the adventure.com website
router.get("/scrape", function (req, res) {
    axios.get("http://adventure.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("div.card-section").each(function (i, element) {
            var results = [];
            var articleLink = $(element).find("h3").find("a").attr("href")
            var articleTitle = $(element).find("h3").find("a").text();
            console.log(articleTitle);
            console.log(articleLink);

            results.push({ link: "http://adventure.com/" + articleLink, title: articleTitle, saved: false });


            db.Article.create(results)
                .then(function (dbArticle) {
                    console.log(dbArticle)
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
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
router.get("/articles", function (req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({}, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(found);
        }
    });
});

module.exports = router;