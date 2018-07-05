var socket = io();

function scrollToBottom(){
  var messages=jQuery("#messages");
  var newMessage=messages.children('li:last-child');
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}
socket.on('connect',function(){
    console.log("connected to server");

});
socket.on('disconnect',function(){
  console.log('Disconnected from Server');
});

socket.on('newMessage',function (message){
  var formattedtime=moment(message.createAt).format('h:mm a');
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:message.text,
    from:message.from,
    createAt:formattedtime

  });
  jQuery('#messages').append(html);
  scrollToBottom();
/*
  var li=jQuery('<li></li>');
  li.text(`${message.from} ${formattedtime}:  ${message.t ext}`);
  jQuery('#messages').append(li);*/
});

socket.on('newlocationMessage',function(messages){
var formattedtime=moment(messages.createAt).format('h:mm a');
var template=jQuery('#location-message-template').html();
var html=Mustache.render(template,{
  from:messages.form,
  url:messages.url,
  createAt:formattedtime

});

/*  var li=jQuery('<li></li>');
  var a=jQuery('<a target="_blank">current location</a>');
  li.text(`${messages.from} ${formattedtime}: `);
  a.attr('href',messages.url);
  li.append(a);*/
  jQuery('#messages').append(html);
  scrollToBottom();
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
