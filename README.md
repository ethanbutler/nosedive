# Nosedive
A Node.js implementation of the first episode of Black Mirror's third season, powered by Socket.io and QR codes.

## Getting Started

`npm install` to download dependencies.

Visiting `localhost:3000/user/anything` will open a page with a QR code you can scan (with, say, SnapChat) to open a page where you can rate the dummy user.

## Demo

A demo is running at http://nosedive.herokuapp.com/user/Ethan.

## Todo

* Impose a timeout between votes so that my friends who think it's funny to mash the "1" rating will chill out
* Set up a databse – rn this is just a super hacked-together proof-of-concept
* Add support for user registration
* Add ability for security guards to dock you a full point if you get unruly at an airport
* See what [this](https://github.com/louisondumont/facematch) is about
