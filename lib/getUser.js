module.exports = ( name, db, callback ) => {

  let collection = db.collection('users')
  collection.findOne( { name: name }, ( err, result ) => {
    callback(result)
    db.close()
  } )

}
