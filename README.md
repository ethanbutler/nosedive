# Nosedive
A Node.js implementation of the first episode of Black Mirror's third season, powered by Socket.io and QR codes.

## Getting Started

`npm install` to download dependencies, `node index.js` to run – no bells or whistles yet.

You'll need to set an environment variable for the URL you're running the site at – this is used to generate the QR code. For local development, use your IP address + port 3000 with no trailing slash for this. You'll also need a MongoDB instance to hook this up to.

## Demo

A demo is running at http://nosedive.herokuapp.com.

## Todo

* Impose a timeout between votes so that my friends who think it's funny to mash the "1" rating will chill out
* Add ability for security guards to dock you a full point if you get unruly at an airport
* See what [this](https://github.com/louisondumont/facematch) is about
