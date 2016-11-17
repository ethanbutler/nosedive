module.exports = (req, res) => {
 let name = req.params.name
 let data = {
   img: `/static/img/${name}.jpg`,
   user: name
 }
 res.render( '../views/rate', data )
}
