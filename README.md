# Scraped-News

Scraped News brings in scraped articles from www.adventures.com, stores them in a mongoDB database, and populates them to the index file. The cards for each news article can be saved, which then populates them to the "Saved articles" page. Each article within the "Saved Articles" page can be commented on by clicking the "add note" button. Notes can then be viewed and deleted as the user sees fit. 

## Technologies
1. axios
2. Handlebars
3. cheerio
4. logger
5. mongoose


## Getting Started
To set up this project locally:

### Prerequisites
1. Initialize a `package.json`: `npm init-y`
2. Install axios: `npm install axios`
3. Install express: `npm install express`
4. Install cheerio: `npm install cheerio`
5. Install logger: `npm install morgan`
6. Install mongoose: `npm install mongoose`

### Installation
1. Clone the repo: `git clone git@github.com:Lindsay-B-Miller/Scraped-News.git`

## Usage
1. Upon loading the server, navigate to the home page `/`. The home page displays two buttons: a) `Scrape Articles` and b)  `Clear Articles`. Click the `Scrape Articles` button to scrape articles from www.adventures.com and load them to the home page.
2. Once articles have been loaded, the user can click on the titles to view the original article at www.adventures.com, or save the article to the `Saved Articles` page. Clicking `Save Article` changes the boolean value `saved` to `true`, allowing them to render on the `Saved Articles` page. 
3. Navigating to the `Save Articles` Page uncovers three more options: a) 
