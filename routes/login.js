const express = require("express");
const {getThemes} = require("./themes");
const router = express.Router();

router.post('/', function (request, response) {
    const username = request.body.username;
    const password = request.body.logpass;

    if(username != process.env._USERNAME) {
        console.warn('WRONG USERNAME');
        console.warn('INPUT = ' + username);
        console.warn("CHECK = " + process.env.USERNAME);
        response.redirect("/");
        return;
    }

    if(password != process.env._PASSWORD) {
        console.warn('WRONG PASSWORD');
        console.warn('INPUT = ' + password);
        console.warn("CHECK = " + process.env._PASSWORD);
        response.redirect("/");
        return;
    }

    request.session.isLogedIn = true;
    request.session.username = username;
    response.render('pages/dashboard', {
        username: request.session.username,
        themes: getThemes(),
    });
})


router.post('/logout', function(request, response) {
    request.session.destroy((error) => {
        if(error){
            console.error(error);
        } else {
            response.redirect("/");
        }
    })
})

module.exports = router;