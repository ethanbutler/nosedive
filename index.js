"use strict"

require( 'dotenv' ).config()
require( 'babel-core/register' )( { presets: 'es-2015' } )

let express = require( 'express' )
let app     = express()
let http    = require( 'http' ).Server( app )
let io      = require( 'socket.io' )( http )
let body    = require( 'body-parser' )
let pug     = require( 'pug' )
let qr      = require( 'qr-image' )


app.use( '/static', express.static( 'static' ) )
app.use( body.json() )
app.set( 'view engine', 'pug' )

app.get( '/', ( req, res ) => {
  res.send('Hello!')
} )

app.get( '/user/:name', ( req, res ) => {
  let name = req.params.name
  let data = {
    user: name,
    img: '/static/ethan.jpg',
    qr: qr.imageSync( 'process.env.URL + '/rate/' + name', { type: 'svg' } ),
    rating: {
      int: '3',
      frac: '00'
    }
  }
  res.render( __dirname + '/views/user', data )
} )

app.get( '/rate/:name', (req, res) => {
  let name = req.params.name
  let data = {
    img: '/static/ethan.jpg',
    user: name
  }
  res.render( __dirname + '/views/rate', data )
} )

io.on( 'connection', socket => {
  let rating = 3
  let count = 1
  let avgVote = vote => {
    count++
    console.log( 'current rating:' + rating )
    console.log( 'new vote:' + vote )
    console.log( 'vote count:' + count )
    return rating = ( rating * ( count - 1 ) + parseInt( vote ) ) / ( count )
  }
  app.post( '/user/:name', ( req, res ) => {
    let vote = req.body.vote
    let newRating = avgVote( vote )
    io.emit( 'rating', newRating )
    res.status(200).send( 'vote counted' )
  } )

} )

http.listen( process.env.PORT || 3000, () => {
  console.log( 'listening')
} )
