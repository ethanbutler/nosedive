let dbConnection = require( '../lib/db' )
let addVote      = require( '../lib/addVote' )

module.exports = ( req, res, io ) => {
 let vote = req.body.vote
 let name = req.params.name
 dbConnection( addVote, {
   name: name,
   vote: vote
 }, newRating => {
   io.emit( 'rating', newRating )
   res.status(200).send( 'vote counted' )
 } )
}
