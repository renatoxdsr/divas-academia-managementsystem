//working with json documents
const fs = require('fs');
//call a data.jason to know lose the sata
const data = require('../data.json');
//because it is an object you have to put in {}
const {age, date} = require('../date')

exports.index = function(req, res) {

    return res.render("members/index", {members : data.members})
}
//Function to CREATE
exports.create = function(req, res) {
    return res.render('members/create')
}
//function to POST 
exports.post = function(req, res){
    //req.query
    //req.body
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

    //here was made the data treatment

    /* //change for timestamp method to understand data as we know
    //using parse to transform milesecs in data
    req.body.birth = Date.parse(req.body.birth)

    //Creating a PK in a json doc
    req.body.id = Number(data.members.length + 1);

    //creating data time
    // counting when this data as created 
    req.body.created_at = Date.now();
    //[{...}]
    //here was made the organization of the data whcih i want to push to my data.json
    const {avatar_url, birth, created_at, id, name, service, gender} = req.body */
    
    //new treatment
    //using let because it allows to change the value in the next variables
    let {avatar_url, 
        birth, 
        name, 
        email,
        blood,
        weight,
        height,
        gender} = req.body
    //because we have to create id and create_at yet we do not use it in this let
    //do not need to use req.body anymore, because it was already explict in the let calling req.body
    birth = Date.parse(req.body.birth)
    // creating a const because id and created_at has to be created now
    /* const created_at = Date.now() */

    let id = 1
    const lastId = data.members[data.members.length - 1]
    
    if(lastId) {
        id = lastId.id + 1
    }

    data.members.push({
        ...req.body,
        id,
        birth,
    })
    //what is the req.body?
    //distructuring the req.body


    //add something in an Array - PUSH
    //data.members.push(req.body) //[{}] in data.json

    //to make the json file to organize it in each item
    // using three condiction first-the file
    // second - null(send a data as hollow/nothing) and for stringify it seems you are not using it, passing as zero condition
    // three - 2 it is like in each 2 space it gives a paragraph - going down for the other line 
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("write file error");

        return res.redirect(`/members/${id}`)
    })

    return res.send(req.body)
};
//function to show(get something)
exports.show = function(req, res) {
    //req.params
    const {id} = req.params;
    
    const foundMember = data.members.find(function(member){
        return member.id == id
    });

    if (!foundMember) return res.send("Member not found")
    
    //creating a variale member 
    const member = {
        //spread Operator
        ...foundMember,
        //bring age function to be shown in members id page
        birth: date(foundMember.birth),
        //print the name (masculine) instead of just "M"
        //creating in nunjucks/html
        gender: "",
        //break the string in eanch ',' common appeared
        /* services: foundMember.services.split(","), */
        //creating the date in datetimeformat 00/00/0000 
        //Formatting date with Intl from Javascript
        /* created_at: new Intl.DateTimeFormat("pt-BR").format(foundMember.created_at), */

        
    }
    return res.render("members/show", {member})
}
//Function to edit
exports.edit = function(req, res){
    //req.params //passando os parametros
    const {id} = req.params;
    
    const foundMember = data.members.find(function(member){
        return member.id == id
    });

    if (!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }
    
    
    return res.render("members/edit", {member })
}
// Function to PUT (UPDATE)
exports.put = function(req, res) {
    const {id} = req.body;
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if(id == member.id ){
            index = foundIndex
            return true
        }
    });

    if (!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error")

        return res.redirect(`/members/${id}`)
    })

}
//Function to DELETE
exports.delete = function(req, res){
    const {id} = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/members")
    })
}
