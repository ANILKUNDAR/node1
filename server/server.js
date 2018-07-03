const path =require('path')
const http=require('http');
const express=require('express');
const socketIO=require("socket.io");

const {generateMessage,generateMessagelocation}=require('./utils/message');
const publicpath=path.join(__dirname,'../public');
const port=process.env.PORT ||3000;
var app=express();
var server=http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicpath));
io.on('connection',(socket)=>{
  console.log("new user connected");

  socket.emit('newMessage',generateMessage('admin','welcome to chat app'));

  socket.broadcast.emit('newMessage',generateMessage('admin','New User Joined'));

  socket.on('createmessage',(message,callback) => {
    console.log('createmessage',message)
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('this is from server');
  });

  socket.on('createlocationmessage',(coords)=>{
    io.emit('newlocationMessage',generateMessagelocation('admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnected',()=>{
    console.log("disconnected");

  });

});

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});
