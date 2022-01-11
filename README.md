# :notes: Spotispy
  This is a web project to stream music from Spotify and show users nearby that listen to similar music using the PostGIS extension for PostgreSQL.

## ⚙️ Setup <br/>
  Import the database from the resource folder into pgAdmin. <br/>
  Create a spotify developer account and use that client_id/secret in the config file. <br/>
  For e-mail system to work, create a gmail account and authorize unsecure apps in google settings, then replace credentials in gmail.js <br/>
  Run ```node app.js``` to start the server (port 3000 by default) or ```nodemon app.js``` to detect file changes automatically and restart the server for you. <br/>

## ✔️ Requirements  <br/>
- Node.js (v14.16.1)
- PostgreSQL With PostGIS Extension
- Spotify Developer Account.
<details>
           <summary>Node Modules</summary>
            <p>- Express -  npm install express</p>
            <p>- Express Sessions - npm install express-session</p>
            <p>- Express Flash - npm install express-flash</p>
            <p>- Postgresql for Node.js - npm install mpg</p>
            <p>- EJS - npm install ejs</p>
            <p>- Crypto-js - npm install crypto-js</p>
            <p>- Nodemailer - npm install nodemailer</p>
            <p>- Multer - npm install multer</p>
            <p>- Cookie-parser - npm cookie-parser</p>
            <p>- Querystring - npm install querystring</p>
            <p>- Spotify web api node - npm install spotify-web-api-node</p>
            <p>- Morgan - npm install morgan</p>
            <p>- Nodemon - npm install nodemon</p>
            <p>- Colors - npm install colors</p> 
</details>

## 📁 Structure  <br/>
  ├── app.js	-	entry point <br/>
  ├── /config		-	config settings, env variables <br/>
  ├── /models		-	data access layer, business logic	 <br/>
  ├── /node_modules		-	self explanatory	 <br/>
  ├── /public	 - public files ```https://localhost:3000/(filepath)```	<br>
  ├── /res		-	resources  <br/> 
  ├── /routes		- api routes <br/>
  └── /views		-  yep <br/>
 
## ℹ️ Resources <br>
### PostgreSql and Node Server Info  <br/>
Use backup file in resource folder for the template database (test: 671f54ce0c540f78ffe1e26dcf9c2a047aea4fda)<br/>
[Node/Express Login System](https://codeshack.io/basic-login-system-nodejs-express-mysql/#:~:text=Getting%20Started,js.)<br/>

### Spotify API Info  <br/>
[Spotify API Demo](https://github.com/mujibsardar/spotify_jquery_only)<br/>
[Connect to Spotify API](https://youtu.be/d0FFlTeyAY8)<br/>
[Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)<br/>
[Spotify Authorization](https://developer.spotify.com/documentation/general/guides/authorization-guide/)<br/>

### Geospatial SQL Objects  <br/>
[PostGIS Extension](https://postgis.net/)<br/>

### Https Info  <br/>
Follow instructions for cert/key, run openssl.bat as admin<br/>
[Create HTTPS server](https://bit.ly/3uBw2oF)<br/>
[Openssl Download](https://slproweb.com/products/Win32OpenSSL.html)<br/>

### Other Info  <br/>
[Geolocation](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation_map_script)<br/>
[Nodemailer](https://blog.mailtrap.io/nodemailer-gmail/)<br/>
[Package size scanner](https://bundlephobia.com/scan)<br/>
[Build codepens](https://www.youtube.com/watch?v=rtdGg4Ttb4M)<br/>
<br/>

### Supported Browsers For Spotify Web Playback SDK  <br/>
|OPERATING SYSTEM  |   	BROWSERS   |	STATUS   |
| ---------------- | ------------- | --------- |
| Mac/Windows/Linux  | Chrome, Firefox, IE*, Microsoft Edge |✓ Supported |
|    Android       |Chrome, Firefox	      |   ✕ Not Supported   |
|         iOS    |	 Safari, Chrome   | ✕ Not Supported   |
* IE 11 or above. Must be on Windows 8.1 or above. 
* It will stream whatever audio quality is set on spotify settings, very high might lag.

## :art: Preview
<img src="/res/Img/preview/home.png">
<img align="left" width="45%"  src="/res/Img/preview/distance.png">
<img align="right" width="45%" src="/res/Img/preview/login.png">



