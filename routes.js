const express = require('express');
//create a variable routes
//This varibles has to be in charge of the Routes of the project
const routes = express.Router();
const instructors = require('./instructors');

routes.get('/', function(req, res){
    return res.redirect("/instructors");
})

routes.get('/instructors', function(req, res){
    return res.render("index");
})

routes.get('/instructors/create', function(req, res){
    return res.render("create")
})

//getting the instructor from the id in data.json
routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', function(req, res){
    return res.render("edit")
})

routes.post("/instructors", instructors.post)

routes.get('/', function(req, res){
    return res.redirect("members");
})
module.exports = routes;