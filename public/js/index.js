var socket = io();

socket.on('connect',function(){
    console.log("connected to server");
    socket.emit('createmessage',{
      to:'sunil@gmail.com',
      text:'hey,This is Anil'
    });
});
socket.on('disconnect',function(){
  console.log('Disconnected from Server');
});

socket.on('newEmail',function (email){
  console.log('new Email',email);
});
