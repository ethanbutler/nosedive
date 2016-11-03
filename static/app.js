var socket = io()

$( document ).ready( function(){

  var inputs = $( '.rate-input' )
  var user   = $( '.rate' ).attr( 'data-user' )

  inputs.on( 'click', function(){
    var vote = $( this ).val()
    $.ajax( {
      method: 'POST',
      url: '/rate/' + user,
      data: JSON.stringify( { vote: vote } ),
      contentType: 'application/json; charset=utf-8'
    } )
    .success( function( res ){
      console.log( res )
    } )
  } )

  socket.on( 'rating', function( newRating ){
    var rating = newRating.toString().split('.')
    var int = rating[0]
    var frac = rating[1].substr(0,3)
    $( '.userRating-int' ).text( int )
    $( '.userRating-frac' ).text( frac )
  } )

} )
