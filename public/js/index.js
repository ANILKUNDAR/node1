var socket = io();

socket.on('connect',function(){
    console.log("connected to server");

});
socket.on('disconnect',function(){
  console.log('Disconnected from Server');
});

socket.on('newMessage',function (message){
var formattedtime=moment(message.createAt).format('h:mm a');
  var li=jQuery('<li></li>');
  li.text(`${message.from} ${formattedtime}:  ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newlocationMessage',function(messages){
var formattedtime=moment(messages.createAt).format('h:mm a');
  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">current location</a>');
  li.text(`${messages.from} ${formattedtime}: `);
  a.attr('href',messages.url);
  li.append(a);
  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit',function(e){
   e.preventDefault();

   var messageTextbox=jQuery('[name=message]');

   socket.emit('createmessage',{
     from:"user",
     text:messageTextbox.val()
   },function(){
     messageTextbox.val('')
   });
});

var locationButton =jQuery('#send-location');
locationButton.on('click',function () {
  if(!navigator.geolocation){
    return alert('geolocation not support by your browser');
   }
   locationButton.attr('disabled','disabled').text("sending Location...");

  navigator.geolocation.getCurrentPosition(function (position) {
     locationButton.removeAttr('disabled').text("send location");
     socket.emit('createlocationmessage',{
       latitude: position.coords.latitude,
       longitude:position.coords.longitude
     });
  }, function () {
     locationButton.removeAttr('disabled').text("send location");
    alert("unable to fetch location");
  });
});
