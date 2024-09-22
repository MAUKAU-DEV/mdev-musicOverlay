# mdev-musicOverlay
 This is my first time working with javascript. The code is messy and not well written. I will update the code and make it more secure.

## Themes Preview

- Default.css<br>
  ![Default.css](https://cdn.discordapp.com/attachments/1148349058038104106/1282477882257575968/image.png?ex=66f14c5a&is=66effada&hm=836ce4ef71376513b96ca5f21d9c7679ad233dd73edf732c122efa438d03cfe9&)
- MAUKAU.css<br>
  ![MAUKAU.css](https://cdn.discordapp.com/attachments/1232090640389505064/1282502732996935740/image.png?ex=66df973f&is=66de45bf&hm=91105b24b28961b321e70f9d2a643644ec99fbc7b2f3bfc9650b6d0c663b6f6a&)
- [ZenniverseLive](https://github.com/MAUKAU-DEV/MDEV-MusicOverlay-ZenniverseLive)<br>
  ![ZenniverseLive.css Preview](https://github.com/MAUKAU-DEV/MDEV-MusicOverlay-ZenniverseLive/blob/main/preview.png)

## Setup
For the setup you need a spotify account and have nodejs installed.
Tested with [Node 20.10]

### Spotify App setup
Login to the [developer dashboard](https://developer.spotify.com/) and create a new app.
Save the CLIENT_ID and CLIENT_SECRET in the .env file. 

We reccomend changing the login username and password  in the .env file for security reasons.

### Run MDEV-MusicOverlay
Now after creating the .env file you just need to run the MDEV-MusicOverlay.exe.
You can now open your browser at ``http://localhost:port/``.

LogIn with the username and password set in the env file and click the button ``Login Spotify``. 

Once you logedin and gave the authorization the overlay should work.
If you want to add themes from the community or create your own just add the css file in the ``/public/themes/`` folder. 

If you have issues or bugs please create a issue on our repository.

## Contribute
If you want to contribute to this project. Just DONT.
This code is too messy and I dont want to torture anyone with my mess.

If you want to run and build the MDEV-MusicOverlay yourself you just need to install the dependencies with ``npm install``.
And run the code with ``node app.js``.

### Add you Theme to the list
If you want to add a theme you made to the "official" theme list. 
Just open a issue with the "Theme request" tag and link your repository. 
