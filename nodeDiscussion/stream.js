const fs = require("fs");
const path = require("path");

const newFilePath = path.join(__dirname, "newFile.txt");
const writableStream = fs.createWriteStream(newFilePath); // it is emitting "drain" event everytime it is ready to write a new chunk of data

// rs.emit("data", chunk); //this is happening BTS
const readableStream = fs.createReadStream("./largeFile.txt"); // it is emitting "data" event everytime it has a chunk of data to emit

// readableStream.on("data", (chunk) => {
//     // console.log(chunk.toString());
//     // console.log(chunk.length);
//     writableStream.write(chunk);
// });

readableStream.pipe(writableStream);



readableStream.on("end", () => {
    console.log("finished reading and writing the file");
});






