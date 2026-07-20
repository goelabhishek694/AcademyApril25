// console.log(global);
// console.log("dir name", __dirname, "file name", __filename);

// console.log(process);
// console.log(process.env);
// console.log(process.cwd());
// console.log(process.argv);
// console.log(process.pid);


//os module


const { log } = require('console');
const os = require('os');

// console.log("arch",os.arch());
console.log("cpus",os.cpus().length);
// console.log("freemem",os.freemem());
// console.log("platform",os.platform());
// console.log("release",os.release());
// console.log("totalmem",os.totalmem());
// console.log("homedir",os.homedir());
// console.log("tmpdir",os.tmpdir());
// console.log("hostname",os.hostname());
// console.log("networkInterfaces",os.networkInterfaces());
// console.log("os",os.os());
// console.log("uptime",os.uptime());
// console.log("userInfo",os.userInfo());
// console.log("version",os.version());


// const path = require('path');

// console.log(__dirname);

// const base = path.basename(__dirname);
// console.log("base",base);''

// //create path independent of platforms
// const newPath = path.join(__dirname, "test", "test.txt");
// console.log("newPath",newPath);

// __dirname+"/test/test.txt";

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "test", "test1.txt");
const content = "Hello World";
const cb = (err) => {
    if(err) throw err;
    console.log("File created successfully");
};

// fs.writeFile(filePath, content, cb);

// fs.appendFile(filePath, " yolo", "utf-8" , cb);


// fs.readFile(filePath, "utf-8", (err, data) => {
//     if(err) throw err;
//     console.log("File read successfully", data);
// })


// fs.mkdir("newDir", cb);

// fs.mkdir(path.join(__dirname,'newDir2'), (err) => {
//     if(err) throw err;
//     console.log("Directory created");
//  })

 //copy file from one directory to another
const copyFrom = path.join(__dirname, "test");
const copyTo = path.join(__dirname, "newDir2", "abc.txt");

//  fs.copyFile(copyFrom, copyTo, (err) =>{
//     if(err) console.log("Error copying file", err);
//     console.log("File copied successfully");
//  })

 fs.stat(copyFrom, (err, stats) => {
    if(err) throw err;
    console.log("File stats", stats);
    console.log("File size", stats.size);
    console.log("File created at", stats.ctime);
    console.log("File modified at", stats.mtime);
    console.log("File is a directory", stats.isDirectory());
    console.log("File is a file", stats.isFile());
    console.log("File is a symbolic link", stats.isSymbolicLink());
    console.log("File is a socket", stats.isSocket());
    console.log("File is a fifo", stats.isFIFO());
    console.log("File is a character device", stats.isCharacterDevice());
    console.log("File is a block device", stats.isBlockDevice());
 })


//  Mini Project
//  Create a project to scan the files in downloads folder and categorise them as compressed ( for rar, zip, 7zip files ), documents ( txt, xlsx, pdf, stc ) , audio and video files
// Read the Downloads Directory: Use fs.readdir or fs.readdirSync to list all files in the downloads directory.
// Categorize Files: Loop through the files, use the path module to extract file extensions, and categorize files based on their extension.
// path.extname() method: This method returns the extension of the file from a file path.
// Move Files: Create separate folders for each category and move files into the appropriate folder using fs.rename or fs.copyFile.