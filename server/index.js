'use strict'

var express = require('express')
var db = require('../db')
var helpers = require('./helpers')
var slug = require('slug')  // replaces spacebars to be url friendly (copied from slides week 4)
var bodyParser = require('body-parser')   // body-parser enables you to read the values of a form easily (copied from slides week 4)

module.exports = express()
  .set('view engine', 'ejs') // configure express to use ejs for templating
  .set('views', 'view')
  .use(express.static('static'))
  .use(bodyParser.urlencoded({extended: true})) //urlencoded is the was browsers normally send forms, (copied from slides week 4)
  // TODO: Serve the images in `db/image` on `/image`.
  .use('/image', express.static('db/image'))
  /* TODO: Other HTTP methods. */
  // .post('/', add)
  // .get('/:id', get)
  // .put('/:id', set)
  // .patch('/:id', change)
  //  .delete('/:id', removeTarget) --- got stuck on trying to add a function called *removeTarget* t0 run after a DELETE request is added to * /:id* while i defined the function on line 62 the terminal says its undefined??
  .get('/', all)
  .get('/:id', get) // function *get* will run when theres a GET request to an */:id*
  .listen(1902)

function all(req, res) {
  var result = {errors: [], data: db.all()}

  /* Use the following to support just HTML:  */
  // res.render('list.ejs', Object.assign({}, result, helpers))

  /* Support both a request for JSON and a request for HTML  */
  res.format
  ({
    json: () => res.json(result),
    html: () => res.render('list.ejs', Object.assign({}, result, helpers))
  })
}

function get(req, res) {
  var result = {errors: [], data: db.all()}
  var id = req.params.id // puts the requested id in a variable named "id"
  var has
  console.log(has)

  try
  {
      has = db.has(id) // checks if the database has the requested "id"
  } catch (doetEigenlijkHelemaalNiksVolgensMijDusWaaromGeefIkHierEenParameterMee)
  {
    result.errors = // overwrites the values in the errors array of var result
    [
      {
        title: 'Bad request',
        id: 400,
        detail: 'bad request'
      }
    ]
      res.render('error.ejs', Object.assign({}, result, helpers))
  }
// function removeTarget(req, res) {}

  if (has) // if the requested id is present in the database...
  {
    var result = {errors: [], data: db.get(id)}
    res.format
    ({
      json: () => res.json(result),
      html: () => res.render('detail.ejs', Object.assign({}, result, helpers))
    })
  //  result.data = db.get(id) // sends the data of the id on which a get request is executed
  //  res.render('detail.ejs', Object.assign({}, result, helpers)) // renders the detail.ejs file
  }
  else // if the requested id is not present in the database...
  {
    result.errors = // overwrites the values in the errors array of var result
    [
      {
        title: 'page not found',
        id: 404,
        detail: 'the page you were looking for could not be found'
      }
    ]
    res.render('error.ejs', Object.assign({}, result, helpers))
  }
}
