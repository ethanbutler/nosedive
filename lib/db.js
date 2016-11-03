let assert = require('assert')
let mongo  = require('mongodb').MongoClient
let url    = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB}?authMechanism=DEFAULT`

module.exports = ( action, insert, callback ) => {
  mongo.connect( url, {}, ( err, db ) => {
    assert.equal(null,err)
    action( insert, db, callback )
  } )
}
