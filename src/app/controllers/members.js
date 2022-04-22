const {age, date} = require('../../lib/date')
//because it is an object you have to put in {}
const Member = require('../models/member')

module.exports = {
    index(req, res) {
        Member.all(function(members) {
            return res.render("members/index", {members})
        })
        
    },
    create(req,res){
        return res.render('members/create')
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
    
        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`)
        })
        
    
    },
    show(req, res){

        Member.find(req.params.id, function(member){
            if(!member) return res.send("member not found!")
            member.birth = date(member.birth).birthDay

            return res.render("members/show", {member})
        })
        
    },
    edit(req, res){
        Member.find(req.params.id, function(member){
            if(!member) return res.send("member not found!")
            member.birth = date(member.birth).iso

            return res.render("members/edit", {member})
        })
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

        Member.update(req.body, function(){
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req,res){
        return
    }
}

