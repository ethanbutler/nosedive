module.exports = ( insert, db, callback ) => {

  let collection = db.collection('users')

  collection.findOne( { name: insert.name }, ( err, result ) => {
    if( result ){
      callback( true )
      db.close()
    } else {
      collection.insert( insert, ( err, result ) => {
        callback( false )
        db.close()
      } )
    }
  } )

}
