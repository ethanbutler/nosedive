let dbConnection = require( '../lib/db' )
let getUser      = require( '../lib/getUser' )
let qr           = require( 'qr-image' )

module.exports = ( req, res ) => {
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
    return res.render( '../views/user', data )
  } )
}
