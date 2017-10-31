# Vox Article Scraper

## Introduction

An application that uses `cheerio` and `request` npm packages to scrape _Vox_
articles, allowing the user to save their links to a _saved articles_ page. The user
is also able to add small notes to saved articles.

## Technologies
- Frontend - [Handlebars.js](http://handlebarsjs.com/ "Handlebars Docs") / [JQuery](https://jquery.com/ "JQuery Docs")
- Routing - [Express.js](https://expressjs.com/ "Express Docs")
- Backend / Server - [Node.js](https://nodejs.org/en/ "Node Docs")
- Database - [MongoDB](https://docs.mongodb.com/?_ga=2.152938301.520094384.1509412873-1028875969.1505257226 "MongoDB Docs") / [Mongoose ODM](http://mongoosejs.com/docs/ "Mongoose Docs")

## Learning Objectives

- Created a MongoDB database using a Mongoose Schema and Mongoose models containing sub-documents.
- Wrote controllers to preform CRUD actions to the database when AJAX calls are made.
- Wrote routes using express router for better separation of concerns in the MVC model.
- Deployed a fullstack application to Heroku that uses a MongoDB database.

## Takeaways

### On AJAX Success callbacks
Learned how to present user visual feedback post-AJAX request without having to refresh the page.

### On Extending Routes With Express
Got a better understanding of how `express.Router()` works:

When using `app.use("/example", exampleRoutes)`
in the `server.js`, every route method that is passed a route extension

example: <br>
```javascript
router.get('/furtherRoute', callback)
```

results in the server treating the `app.use` route string argument as the root route, resulting in a router call that ends up looking like:

`localhost:3000/example/furtherRoute`

This allows for the developer to write more elaborate routes as extensions of pre-existing routes be treating the pre-existing routes as root routes.
