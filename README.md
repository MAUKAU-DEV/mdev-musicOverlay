# mdev-musicOverlay
 This is my first time working with javascript. The code is messy and not well written. I will update the code and make it more secure.

## Themes Preview

- Default.css ![Default.css](https://cdn.discordapp.com/attachments/1232090640389505064/1282502732476846122/image.png?ex=66df973f&is=66de45bf&hm=0cfec48cda81edd468762fb0893aa4d0fcddcabcc01320d493e9a7f257a12a00&)
- MAUKAU.css ![MAUKAU.css](https://cdn.discordapp.com/attachments/1232090640389505064/1282502732996935740/image.png?ex=66df973f&is=66de45bf&hm=91105b24b28961b321e70f9d2a643644ec99fbc7b2f3bfc9650b6d0c663b6f6a&)

## Setup
For the setup you need a spotify account and have nodejs installed.
Tested with [Node 20.10]

### Spotify App setup
Login to the developer dashboard and create a new app.
Save the CLIENT_ID and CLIENT_SECRET in the .env file. 

We reccomend changing the login username and password for security reasons.

### Project Dependencies Setup
Install the required packages with ``npm install``.
Now you can start the overlay with ``node app.js``. 

You can now open your browser at ``http://localhost:port/``.

LogIn with the username and password set in the env file and click the button ``Login Spotify``. 

Once you logedin and gave the authorization the overlay should work.
If you want to add themes from the community or create your own just add the css file in the ``/public/themes/`` folder. 

If you have issues or bugs please create a issue on our repository.