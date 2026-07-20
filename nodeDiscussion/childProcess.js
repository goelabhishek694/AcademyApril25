const { exec, execFile, spawn } = require("child_process");

// list of contents of cwd(ls) in a long format (l) with human readable file sizes (h)
// exec("ls -lh", (err, stdout,stderr) => {
//     if(err){
//         console.error(`error: ${err}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
// });

// const scriptPath = "./file.sh";
// const args = ["arg1", "arg2", "arg3"];

// execFile(scriptPath, args, (err, stdout, stderr) => {
//   if (err) {
//     console.error(`error: ${err}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });


//spawn -> generally used to run different programms


spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["https://www.google.com", "--incognito"]);


//fork