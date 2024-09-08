
const filesystem = require("node:fs");
const express = require("express");
const themesRouter = express.Router();


function getThemes() {
	if (!filesystem.existsSync("./public/themes/")) {
		console.log("Path does not exist");
		return;
	} else {
		console.log("Path Exists");
	}

	var themesList = filesystem.readdirSync("./public/themes/", {
		withFileTypes: false,
	});

	if (themesList.length == 0) {
		console.error("Themes Array Null");
		return;
	}

	return themesList;
}

themesRouter.post("/updateTheme", function (request, response) {
	var { currentTheme } = require("../routes/routes");
	if (!request.session.isLogedIn) {
		request.session.destroy((error) => {});
		response.redirect("/404");
		return;
	}

	const newtheme = request.body.themes_list;
	filesystem.writeFile("theme.txt", newtheme, (err) => {
		if (err) {
			console.error(err);
			response.redirect("/404");
		} else {
			console.log("New theme set!");
			console.log("Theme: " + newtheme);
			currentTheme.name = newtheme;
			console.log("New theme: " + currentTheme.get());
			response.redirect("/");
		}
	});
});

module.exports = {
	themesRouter,
	getThemes,
};
