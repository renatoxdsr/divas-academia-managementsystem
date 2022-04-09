//working with json documents
const fs = require('fs');
//call a data.jason to know lose the sata
const data = require('./data.json');

//function to POST
//export post
exports.post = function(req, res){
    //req.query
    //req.body
    //creating a constructor
    const keys = Object.keys(req.body)
    //validation if all the blanks are filled
    // to send to DB
    for(key of keys){
      if (req.body[key]== ""){
        return res.send('Please, fill all the fileds')
    }} 

    //change for timestamp method to understand data as we know
    //using parse to transform milesecs in data
    req.body.birth = Date.parse(req.body.birth)
    //creating data time
    // counting when this data as created 
    req.body.created_at = Date.now();
    //[{...}]
    //add something in an Array - PUSH
    data.instructors.push(req.body) //[{}] in data.json

    //to make the json file to organize it in each item
    // using three condiction first-the file
    // second - null(send a data as hollow/nothing) and for stringify it seems you are not using it, passing as zero condition
    // three - 2 it is like in each 2 space it gives a paragraph - going down for the other line 
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("write file error");

        return res.redirect("/instructors")
    })

    return res.send(req.body)
};

//transforming a notation in JSON

//function to UPDATE


//Function to DELETE
