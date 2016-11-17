"use strict"

require( 'dotenv' ).config()
require( 'babel-core/register' )( { presets: 'es2015' } )

let express = require( 'express' )
let app     = express()
let body    = require( 'body-parser' )

app.use( '/static', express.static( 'static' ) )
app.use( body.json() )
app.set( 'view engine', 'pug' )

let http    = require( 'http' ).Server( app )
let io      = require( 'socket.io' )( http )
let multer  = require( 'multer' )
let storage = multer.diskStorage( {
  destination: './static/img',
  filename: (req, file, cb) => {
    let name = req.body.name
    cb( null, name + '.jpg' )
  }
} )
let upload  = multer( {
  storage: storage
} )

app.get( '/', ( req, res ) => {
  return res.render( __dirname + '/views/index' )
} )
app.get(  '/user/:name', require( './routes/getUser' ) )
app.post( '/user/', upload.single('picture'), require( './routes/postUser' ) )
app.get(  '/rate/:name', require( './routes/getRate' ) )
app.post( '/rate/:name', ( res, req ) => {
  let postRate = require( './routes/postRate' )
  postRate( res, req, io )
} )

http.listen( process.env.PORT || 3000, () => {
  console.log( 'listening')
} )
