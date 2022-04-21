
//because it is an object you have to put in {}
const {date} = require('../../lib/date')

module.exports = {
    index: function(req, res) {
        return res.render("members/index")
    },
    create: function(req,res){
        return res.render('members/create')
    },
    post: function(req,res){
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
    show: function(req,res){
        return
    },
    edit: function(req, res){
        return
    },
    put:function(req,res) {
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
    delete:function(req,res){
        return
    }
}

