# article-scraper

## Introduction

An application that uses `cheerio` and `request` npm packages to scrape _Vox_
articles, allowing the user to save their links to a _saved articles_ page. The user
is also able to add small notes to saved articles.

## Learning Objectives

## Takeaways

### On Routing With express
##### Extending Routes
Got a better understanding of how `express.Router()` works:

When using `app.use("/example", exampleRoutes)`
in the `server.js`, every route method that is passed a route extension

example: <br>
`router.get('/furtherRoute', callback)`

results in the server treating the `app.use` route string argument as the root route, resulting in a router call that ends up looking like:

`localhost:3000/example/furtherRoute`

This allows for the developer to write more elaborate routes as extensions of pre-existing routes be treating the pre-existing routes as root routes.
