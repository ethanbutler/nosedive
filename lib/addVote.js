module.exports = ( insert, db, callback ) => {

  let collection = db.collection('users')
  let avgVote = ( vote, curRating, count ) => {
    return ( curRating * ( count - 1 ) + parseInt( vote ) ) / ( count )
  }

  collection.findOne( { name: insert.name }, ( err, result ) => {
    if( result ){
      let curRating = result.curRating
      let numVotes = result.numVotes + 1
      let newRating = avgVote( insert.vote, curRating, numVotes )
      collection.updateOne( { name: insert.name }, {
        name: insert.name,
        curRating: newRating,
        numVotes: numVotes
      } )
      // if user is found
      callback( newRating )
      db.close()
    } else {
      // if no user is found
    }
  } )

}
