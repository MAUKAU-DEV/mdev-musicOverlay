const querystring = require('node:querystring'); 
const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const SPOTIFY_AUTHORIZE = "https://accounts.spotify.com/authorize?";


const SPOTIFY_SCOPES = 'user-read-playback-state';

router.get('/login', function (req, res) {

    res.redirect(SPOTIFY_AUTHORIZE + querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: SPOTIFY_SCOPES,
        redirect_uri: "http://localhost:5000/spotify/callback",
        state: "eterootghegergt",
    }));
});

router.get('/callback', function (req, res){
    var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: "http://localhost:5000/dashboard",
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      json: true
    };
  }
});

module.exports = router;