
//because it is an object you have to put in {}
const Instructor = require('../models/instructor')

module.exports = {
    index(req, res) {
        Instructor.all(function(instructors) {
            return res.render("instructors/index", {instructors})
        })
        
    },
    create(req,res){
        return res.render('instructors/create')
    },
    post(req,res){
    //creating a constructor
    //here was made the validation
        const keys = Object.keys(req.body)
    //validation if all the blanks are filled
    // to send to DB
    //here was made the validation
        for(key of keys){
        if (req.body[key]== ""){
            return res.send('Please, fill all the fileds')
        }} 
    
        Instructor.create(req.body, function(instructor){
            return res.redirect(`/instructors/${instructor.id}`)
        })
        
    
    },
    show(req,res){
        return
    },
    edit(req, res){
        return
    },
    put(req,res) {
        //creating a constructor
    //here was made the validation
    const keys = Object.keys(req.body)
    //validation if all the blanks are filled
    // to send to DB
    //here was made the validation
    for(key of keys){
      if (req.body[key]== ""){
        return res.send('Please, fill all the fileds')
    }} 

        return
    },
    delete(req,res){
        return
    }
}

