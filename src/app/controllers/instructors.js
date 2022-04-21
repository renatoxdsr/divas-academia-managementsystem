
//because it is an object you have to put in {}
const {date} = require('../../lib/date')
const db = require('../../config/db')

module.exports = {
    index: function(req, res) {
        db.query('SELECT * FROM instructors', function(err, results){
            if(err) return res.send("Database Error!")

            return res.render("instructors/index", {instructors : results.rows})
        })
        
    },
    create: function(req,res){
        return res.render('instructors/create')
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
    
    
    //using let because it allows to change the value in the next variables
    let {avatar_url, birth, name, services, gender} = req.body

    //Instructions to sql 
    const query = `
        INSERT INTO instructors (
            name,
            avatar_url,
            birth,
            gender,
            services,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `

    const values = [
        req.body.name,
        req.body.avatar_url,
        date(req.body.birth).iso,
        req.body.gender,
        req.body.services,
        date(Date.now()).iso
    ]    

    db.query(query, values, function(err, results){
        if(err) return res.send("Database Error!")
        
        return res.redirect(`/instructors/${results.rows[0].id}`)
    })
    
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

