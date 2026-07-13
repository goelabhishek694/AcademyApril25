const express = require('express');
const http = require("http");
const {Server} = require("socket.io");

const app = express();
//Static resources are files like HTML, CSS, JavaScript, images, etc., that don't need to be generated, modified, or processed on the server before being sent to the client.
app.use(express.static("public"));

const server = http.createServer(app);
//this io is responsible for handling all the socket connection
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    // setInterval(() => {
    //     socket.emit("message", "message from server --   "+socket.id+ " "+ "at "+ new Date().toISOString());
    // }, (2000));
    socket.emit("message", "Hey there, welcome to the server");

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
    });

    socket.on("message", (data) => {
        //broadcasts the received msg to all other connected clients except the sender. 
        socket.broadcast.emit("broadcast", data)
    })
    // let room = parseInt(Math.random(0,1)*1000);
    socket.on("create_grp", (room) => {
        console.log(room)
        socket.join(room);
    });

    socket.on("join_grp", (room) => {
        console.log(socket.id+" joined the room ", room);
        socket.join(room);
    });

    socket.on("grp_msg", ({msg, room}) =>{
        socket.to(room).emit("serv_grp_message", msg);
    });

    socket.on("leave_grp", (room) => {
        console.log(socket.id+" left the room ", room);
        socket.leave(room);
    });
    
})

app.get("/", (req, res) => {
    res.send("Hello World");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});