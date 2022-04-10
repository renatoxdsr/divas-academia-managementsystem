//working with json documents
const fs = require('fs');
//call a data.jason to know lose the sata
const data = require('./data.json');


//function to show(get something)
exports.show = function(req, res) {
    //req.params
    const {id} = req.params;
    
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    });

    if (!foundInstructor) return res.send("Instructor not found")
    
    //creating a variale instructor 
    const instructor = {
        //spread Operator
        ...foundInstructor,
        age: "",
        //print the name (masculine) instead of just "M"
        //creating in nunjucks/html
        gender: "",
        //break the string in eanch ',' common appeared
        services: foundInstructor.services.split(","),
        created_at: "",

    }
    return res.render("show", {instructor})
}

//function to POST
//export post
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
    req.body.id = Number(data.instructors.length + 1);

    //creating data time
    // counting when this data as created 
    req.body.created_at = Date.now();
    //[{...}]
    //here was made the organization of the data whcih i want to push to my data.json
    const {avatar_url, birth, created_at, id, name, service, gender} = req.body */
    
    //new treatment
    //using let because it allows to change the value in the next variables
    let {avatar_url, birth, name, services, gender} = req.body
    //because we have to create id and create_at yet we do not use it in this let
    //do not need to use req.body anymore, because it was already explict in the let calling req.body
    birth = Date.parse(birth)
    // creating a const because id and created_at has to be created now
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
        id,
        name,
        gender,
        avatar_url, 
        services,
        birth,
        created_at,
    })
    //what is the req.body?
    //distructuring the req.body


    //add something in an Array - PUSH
    //data.instructors.push(req.body) //[{}] in data.json

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
