var {currentTheme} = require("../app");
const filesystem = require('node:fs');
const express = require("express");
const themesRouter = express.Router();

function getThemes(){
    if(!filesystem.existsSync("./views/themes/")){
        console.log("Path does not exist");
        return;
    } else {
        console.log("Path Exists");
    }

    var themesList = filesystem.readdirSync("./views/themes/",{ withFileTypes: false });

    if (themesList.length == 0){
        console.error("Themes Array Null");
        return;
    }

    return themesList;
}


themesRouter.post('/updateTheme', function(request, response){
    if(!request.session.isLogedIn){
        request.session.destroy((error) => {})
        response.redirect("/404");
        return;
    }

    const newtheme = request.body.themes_list;
    filesystem.writeFile("theme.txt", newtheme, err => {
        if(err){
            console.error(err);
        } else {
            console.log("New theme set!")
            currentTheme = newtheme;
            console.log("New theme: " + currentTheme);
        }
    })
})

module.exports = {
    themesRouter,
    getThemes,
}