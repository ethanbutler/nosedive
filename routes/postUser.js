let dbConnection = require( '../lib/db' )
let addUser      = require( '../lib/addUser' )

module.exports = ( req, res ) => {
  let name = req.body.name
  dbConnection( addUser, {
    name: name,
    curRating: 0,
    numVotes: 0
  }, ( doesUserExist, name ) => {
    if( doesUserExist ){
      return res.status(409).send( 'user already exists' )
    } else {
      return res.status(200).send( name )
    }
  } )
}
