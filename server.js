var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Requiring models
var db = require("./models");

var PORT = 3000;

// Initializing Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/articlesController.js");

app.use(routes);

// Connectiong to Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Routes

// GET route for scraping the adventure.com website
app.get("/scrape", function (req, res) {
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


// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
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


app.listen(PORT, function () {
    console.log("App running on port http://localhost:" + PORT)
})