module.exports = ( name, db, callback ) => {

  let collection = db.collection('users')
  console.log( )
  collection.findOne( { name: name }, ( err, result ) => {
    callback(result)
    db.close()
  } )

}
