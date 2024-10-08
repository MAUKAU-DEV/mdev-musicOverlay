const express = require("express");
const session = require("express-session");
const filesystem = require("node:fs");
const dotenv = require("dotenv");
const path = require('path');
const app = express();
var {currentTheme} = require("./routes/routes");

// SETTINGS
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "secret-key",
		resave: false,
		saveUninitialized: false,
	}),
);
dotenv.config();
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public/'));
app.use(express.static(path.join(__dirname, 'views')));
const PORT = process.env.PORT || 8080;

const loginRoute = require("./routes/login");
const {routesRouter} = require("./routes/routes");
const { themesRouter } = require("./routes/themes");
const spotifyRouter = require("./routes/spotify");

app.use("/login", loginRoute);
app.use("/", routesRouter);
app.use("/dashboard", themesRouter);
app.use("/spotify", spotifyRouter);

app.listen(PORT, () => {
	console.log(`MDEV-MusicOverlay listening on port ${PORT}`);

	if (!filesystem.existsSync("theme.txt")) {
		filesystem.writeFile("theme.txt", "default.css", (error) => {
			if (error) {
				console.error(error);
			} else {
				console.log("New theme set!");
				currentTheme.set("default.css");
			}
		});
	} else {
		currentTheme.set(filesystem.readFileSync("theme.txt"));
		console.log("Current Theme = " + currentTheme.get());
	}

});

exports.session = session;
