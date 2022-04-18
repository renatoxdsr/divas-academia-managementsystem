const express = require('express');
//create a variable routes
//This varibles has to be in charge of the Routes of the project
const routes = express.Router();
const instructors = require('./instructors');

routes.get('/', function(req, res){
    return res.redirect("/instructors");
})

routes.get('/instructors', instructors.index);


routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create")
})

//getting the instructor from the id in data.json
routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.post("/instructors", instructors.post)

//HTTP - VERBS
//GET: Receive RESOURCE
//POST: Create or Save a New RESOURCE with sent datas
//PUT: Update RESOURCE
//DELETE: Delete RESOURCE

routes.put("/instructors", instructors.put)



routes.get('/members', function(req, res){
    return res.redirect("members");
})
module.exports = routes;