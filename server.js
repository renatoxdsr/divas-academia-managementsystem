const express = require('express');
const nunjucks = require('nunjucks');
//calling the routes 
const routes = require("./routes");
//call the method override
const methodOverride = require('method-override')

const server = express();

//using middlewares (.use)
// middleware - intercepts point a and b
server.use(express.urlencoded({extended : true})) 
server.use(express.static('public'))
//setting override
//Method Override overwrite the type of method you are using
server.use(methodOverride('_method')) //ypu have to put the methodOverride before the routes -- remeber the verbs
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    //não salvar o cache - não vir a copia
    noCache: true
})

server.listen(5000, function(){
    console.log("Server is running")
})
/* server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/59875607?v=4",
        name: "Renato Xavier",
        role: "Front-end Developer",
        description: "Javascript, HTML, CSS",
        link: [
            {name: "Github", url: "https://github.com/renatoxdsr"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/renatoxavierinternational/"},
            {name: "Medium", url: "https://medium.com/@renatoxavier-ds"}
            
        ]
    }
    //return res.send("HI, lorena")
    // em vez de ser send de enviar algo
    // agora deve rederizar algo, então
    //ou seja rederizar alguam view, algum documento da pasta view
    return res.render("about", {about : about})
    // passar about para mostrar o const data
    //para mostrar a variavel data 
})
 */
/* server.get("/portfolio", function(req, res){
    //enviar os dados do back-end para o front-end
    //enviar od dados dos videos no data.js para a pagina portfolio
    return res.render("portfolio", {itens : videos})
}) */

/* server.get("/video", function(req, res) {
    const id = req.query.id;

    //fazer um filtro do data.js pegando cada video
    const video = videos.find(function(video){
        // a quick method to return a if boolean (true or false)
        //cleancode principles
        return video.id == id;
        /* if(video.id == id) {
            return true
        } */
 /*    })

    if (!video){
        return res.send("video not found")
    }
    return res.render("video", { item: video});
}) */ 

