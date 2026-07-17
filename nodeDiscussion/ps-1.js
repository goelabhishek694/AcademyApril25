// Copy a large file in the folder
// If you want to generate large files with code

const fs = require("fs");
//generate the content
// const content = Math.random().toString(36).repeat(10000000); //130mb 

//write content to file
// fs.writeFileSync(__dirname + "/largeFile.txt", content);

const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
    const readStream = fs.readFile(__dirname + "/largeFile.txt", (err, data) => {
        if(err){
            throw err;
        }
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// solution -> streaming 