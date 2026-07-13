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
})

app.get("/", (req, res) => {
    res.send("Hello World");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});