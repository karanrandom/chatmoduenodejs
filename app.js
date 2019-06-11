var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Blocks HTML characters (security equivalent to htmlentities in PHP)
    fs = require('fs');
    var session = require('express-session');
    var Array = require('node-array');
    var unique = require("array-unique").immutable;
var user_array2=[];
var user_array3=[];
   // process.ENV.abc='';
    
var allusername;
var alluserid;


// Loading the page index.html
var ssn;
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html'),
 ssn = req.session; 
 // ssn.ids;
});

io.sockets.on('connection', function (socket, username) {
	username=username;
    // When the username is received it’s stored as a session variable and informs the other people
      
    socket.on('new_client', function(username,userid) {
    
        username = ent.encode(username);
       userid=ent.encode(userid);
          var user_array=[];
          user_array2=[];
            var data;
            user_array['username']=username;
       user_array['id']=userid;
       user_array2.push(user_array);

        const result = [];
const map = new Map();
for (const item of user_array2) {
	console.log(item);
if(!map.has(item.id)){
map.set(item.id, true); // set any value to Map
result.push({
id: item.id,
username: item.username
});
}
}
console.log(result)
    

      //  const result = user_array2.filter(id => user_array2.id != id)[2];
      //  console.log(result);
      // if (result !=''){


      // }
      // else{
      // 	return false;
      // }
       
  // const result = user_array2.filter(id => user_array2.id != userid && username=>user_array2.username!=username );


       result.forEachAsync(function(element, index, arr) {
       allusername=element.username;
        alluserid=element.id;
       
   

   // for(i=0;i<=user_array2.length;i++){
   
   // 	data=user_array2[i].username;
   // 	console.log(data);
   // }
     

       // ssn.ids = userid;
       //  console.log(ssn.id);
        //socket.username = username;
               // socket.broadcast.to(socket.id).emit('new_client',username );
       //  socket.broadcast.to('ID').emit( 'send msg', {somedata : somedata_server} );
       console.log(allusername);
       console.log(alluserid);
        

socket.broadcast.emit('new_client', allusername,alluserid);
       });

           });

 socket.on('joinRoom', function (userData) {
  // console.log('joinRoom',userData);

   
     var room = userData.userid;
     console.log(room);
     globalabc=room;

     socket.join(room);

io.sockets.in(room).emit('connectroom', 'what is going on, party people?');  
 // socket.broadcast.to(id).emit('message', msg);
      //socket.emit('message',{username: userData.username, message: "User "+userData.userid+" join the room" });   
 });

    // When a message is received, the client’s username is retrieved and sent to the other people
    socket.on('message', function (userData) {
        message = ent.encode(userData.message);
       
  // var roster = io.sockets.clients('room');
 console.log(globalabc);
  // return false;
   
       //socket.broadcast.to(Id).emit( 'message', {username: socket.username, message: message} );
      // io.socket.to(socket.id).emit('message', {username: socket.username, message: message} );
      //  socket.broadcast.to(socket.id).emit( 'message', {username: socket.username, message: message} );
      // socket.join(room);.
      //  io.sockets.in(room).emit('messageReturn', userData);

       io.to(globalabc).emit('messageReturn', userData);
    }); 


   

  //message = ent.encode(message);
  console.log();

  });


console.log("connection is at port 8080");
server.listen(8080);









  
  