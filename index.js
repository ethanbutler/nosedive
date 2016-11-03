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
let pug     = require( 'pug' )
let qr      = require( 'qr-image' )
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

let dbConnection = require( './lib/db' )
let addUser      = require( './lib/addUser' )
let addVote      = require( './lib/addVote' )
let getUser      = require( './lib/getuser' )

app.get( '/', ( req, res ) => {
  return res.render( __dirname + '/views/index' )
} )

app.get( '/user/:name', ( req, res ) => {
  let name = req.params.name
  dbConnection( getUser, name, ( results ) => {
    if( !results ){
      return res.render( __dirname + '/views/404' )
    }
    let rating = results.curRating.toString().split('.')
    let int = rating[0]
    let frac = rating[1] ? rating[1].substr(0,3) : '000'
    let data = {
      user: results.name,
      img: `/static/img/${results.name}.jpg`,
      qr: qr.imageSync( `${process.env.URL}/rate/${results.name}`, { type: 'svg' } ),
      rating: {
        int: int,
        frac: frac
      }
    }
    return res.render( __dirname + '/views/user', data )
  } )
} )

app.post( '/user/', upload.single('picture'), ( req, res ) => {
  let name = req.body.name
  dbConnection( addUser, {
    name: name,
    curRating: 0,
    numVotes: 0
  }, ( doesUserExist ) => {
    let message = doesUserExist ? 'user already exists' : 'user created'
    res.status(200).send(message)
  } )
} )

app.get( '/rate/:name', (req, res) => {
  let name = req.params.name
  let data = {
    img: `/static/img/${name}.jpg`,
    user: name
  }
  res.render( __dirname + '/views/rate', data )
} )

io.on( 'connection', socket => {
  let rating = 3
  let count = 1
  let avgVote = vote => {
    count++
    return rating = ( rating * ( count - 1 ) + parseInt( vote ) ) / ( count )
  }
  app.post( '/rate/:name', ( req, res ) => {
    let vote = req.body.vote
    let newRating = avgVote( vote )
    io.emit( 'rating', newRating )
    res.status(200).send( 'vote counted' )
  } )

} )

http.listen( process.env.PORT || 3000, () => {
  console.log( 'listening')
} )
