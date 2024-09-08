const querystring = require("node:querystring");
const express = require("express");
const http = require("http");
const request = require("request");
const crypto = require("crypto");
const fileSystem = require("node:fs");
const spotifyRouter = express.Router();
const dotenv = require("dotenv");
const mlog = require("../util/mlog");
dotenv.config();

const SPOTIFY_AUTHORIZE = "https://accounts.spotify.com/authorize?";

const SPOTIFY_SCOPES = "user-read-playback-state";

var ACCESS_TOKEN = "";

const generateRandomString = (length) => {
	return crypto.randomBytes(60).toString("hex").slice(0, length);
};

function clearEnvCookie(req, res, next) {
	mlog.log("Clear Cookies");
	mlog.log(
		`Client ID: ${process.env.SPOTIFY_CLIENT_ID} & Client Secret: ${process.env.SPOTIFY_CLIENT_SECRET}`,
	);
	next();
}

function saveRefreshToken(refresh_token) {
	try {
		var jsonData = JSON.stringify(refresh_token);
		fileSystem.writeFileSync(".spotify", jsonData, "utf8");
	} catch (err) {
		mlog.error(`saveRefreshToken() --> ${err}`);
	}
}

function getRefreshToken() {
	try {
		const data = fileSystem.readFileSync(".spotify", "utf8");
		refreshTokenObject = JSON.parse(data);
		mlog.log(`refresh_token = ${refreshTokenObject}`);
		return refreshTokenObject;
	} catch (err) {
		mlog.log(`getRefreshToken() --> ${err}`);
		return false;
	}
}

function getNewAccessToken() {
	request.get(`http://localhost:${process.env.PORT}/spotify/refresh_token`, {
		headers: {
			"content-type": "application/x-www-form-urlencoded",
		},
	});

	mlog.log(`NEW ACCESS TOKEN `);
}

function startDataUpdate() {
	mlog.log("STARTING DATA UPDATE");
	getNewAccessToken();
}

spotifyRouter.get("/login", clearEnvCookie, function (req, res) {
	var state = generateRandomString(16);
	req.session.stateKey = state;
	mlog.log(`State Cookie: ${state}`);

	res.redirect(
		SPOTIFY_AUTHORIZE +
			querystring.stringify({
				response_type: "code",
				client_id: process.env.SPOTIFY_CLIENT_ID,
				scope: SPOTIFY_SCOPES,
				redirect_uri: "http://localhost:5000/spotify/callback",
				state: state,
			}),
	);
});

spotifyRouter.get("/callback", function (req, res) {
	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.session.stateKey;

	if (state === null || state !== storedState) {
		res.redirect(
			"/#" +
				querystring.stringify({
					error: "state_mismatch",
				}),
		);
	} else {
		mlog.log(`Callback StateKey: ${req.session.stateKey}`);
		req.session.stateKey = null;
		var authOptions = {
			url: "https://accounts.spotify.com/api/token",
			form: {
				code: code,
				redirect_uri: "http://localhost:5000/spotify/callback",
				grant_type: "authorization_code",
			},
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				Authorization:
					"Basic " +
					new Buffer.from(
						process.env.SPOTIFY_CLIENT_ID +
							":" +
							process.env.SPOTIFY_CLIENT_SECRET,
					).toString("base64"),
			},
			json: true,
		};
		request.post(authOptions, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				req.session.access_token = body.access_token;
				ACCESS_TOKEN = body.access_token;
				saveRefreshToken(body.refresh_token);

				var access_token = body.access_token,
					refresh_token = body.refresh_token;

				if (refresh_token == getRefreshToken()) {
					mlog.log("SUCCESS REFRESH TOKEN WORKING");
				}

				//				var options = {
				//					url: "https://api.spotify.com/v1/me/player",
				//					headers: { Authorization: "Bearer " + access_token },
				//					json: true,
				//				};
				//
				//				// use the access token to access the Spotify Web API
				//				request.get(options, function (error, response, body) {
				//					mlog.log("API CALL:");
				//					mlog.log(body);
				//				});
				//
				// we can also pass the token to the browser to make requests from there
				res.redirect(
					"/#" +
						querystring.stringify({
							access_token: access_token,
							refresh_token: refresh_token,
						}),
				);
			} else {
				res.redirect(
					"/#" +
						querystring.stringify({
							error: "invalid_token",
						}),
				);
			}
		});
	}
});

spotifyRouter.get("/refresh_token", function (req, res) {
	var refresh_token = getRefreshToken();

	mlog.log(`GET/refresh_token() --> Load RefreshToken: ${refresh_token}`);

	var authOptions = {
		url: "https://accounts.spotify.com/api/token",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				new Buffer.from(
					process.env.SPOTIFY_CLIENT_ID +
						":" +
						process.env.SPOTIFY_CLIENT_SECRET,
				).toString("base64"),
		},
		form: {
			grant_type: "refresh_token",
			refresh_token: refresh_token,
		},
		json: true,
	};

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var access_token = body.access_token,
				refresh_token = body.refresh_token;
			ACCESS_TOKEN = access_token;

			mlog.log(
				`GET/refresh_token() --> New AccessToken: ${body.access_token}`,
			);
			res.send({
				access_token: access_token,
				refresh_token: refresh_token,
			});
		}
	});
});

spotifyRouter.get("/playback", function (req, res) {
	mlog.log(ACCESS_TOKEN);

	var options = {
		url: "https://api.spotify.com/v1/me/player/currently-playing",
		headers: { Authorization: "Bearer " + ACCESS_TOKEN },
		json: true,
	};
	// use the access token to access the Spotify Web API
	request.get(options, function (error, response, body) {
		if (error) {
			mlog.error(`GET/playback() --> ${error}`);
		}

		if (response.statusCode === 200) {
			mlog.log("API CALL:");
			mlog.log(body);
			res.json(body);
		} else {
			mlog.warn(`Status code: ${response.statusCode}`);
			res.json(response.statusCode);
		}
	});
});

getNewAccessToken();
setInterval(startDataUpdate, 3540000);

module.exports = spotifyRouter;
