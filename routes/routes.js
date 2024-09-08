const express = require("express");
const { getThemes } = require("./themes");
const routesRouter = express.Router();

currentTheme = {};

currentTheme.set = function(newTheme){
	currentTheme.name = newTheme;
}

currentTheme.get = function(){
	return currentTheme.name;
}

routesRouter.get("/", (request, response) => {
	if (request.session.isLogedIn == true) {
		response.render("pages/dashboard", {
			username: request.session.username,
			themes: getThemes(),
			currentTheme: currentTheme.get(),
		});
		return;
	}

	response.render("pages/login");
});

routesRouter.get("/dashboard", (request, response) => {
	if (request.session.isLogedIn == false) {
		response.redirect("/");
		return;
	}

	response.render("pages/dashboard", {
		username: request.session.username,
		themes: getThemes(),
	});
});

routesRouter.get("/404", (request, response) => {
	response.render("pages/404");
});

routesRouter.get("/overlay", function (request, response) {
	response.render("pages/overlay", {
		activetheme: currentTheme.get(),
	});
});


module.exports = {
	routesRouter,
	currentTheme,
};