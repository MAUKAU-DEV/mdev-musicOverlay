const express = require("express");
const {getThemes} = require("./themes");
const router = express.Router();
var {currentTheme} = require("../app");

router.get('/', (request, response) => {
    if(request.session.isLogedIn == true){
        response.render('pages/dashboard', {
            username: request.session.username,
            themes: getThemes(),
        });
        return;
    }

    response.render('pages/login');
})

router.get('/dashboard', (request, response) => {
    if(request.session.isLogedIn==false){
        response.redirect("/");
        return;
    }

    response.render('pages/dashboard', {
        username: request.session.username,
        themes: getThemes(),
    });
})

router.get('/404', (request, response)=> {
    response.render("pages/404")
})

router.get('/overlay', function(request, response) {
    response.render('pages/overlay', {
        activetheme: currentTheme,
    })
})

module.exports = router