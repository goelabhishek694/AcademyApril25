// there can be certain tasks that are CPU intensive like image processing, video encoding, etc.
//we will take example of fibonacci series -> fib(23) = fib(22) + fib(21)

const express = require("express");
const app = express();
const {fork} = require("child_process");
const path = require("path");

app.use(express.static("public"));

app.get("/fib", (req, res) => {
    const {number, requestNumber} = req.query;
    console.log("handler fn ran for req", requestNumber);
    if(!number || isNaN(number)) {
        return res.status(400).send("Invalid number");
    }
    //creating a new child process
    const fiboRes = fork(path.join(__dirname, "fiboWorker.js"));
    fiboRes.send({number: parseInt(number, 10)});

    fiboRes.on("message", (result) => {
        console.log("sending response for req", requestNumber);
        res.status(200).json({
            status: "success",
            message: `Fibonacci of ${number} is ${result}`,
            requestNumber
        });
        fiboRes.kill();
    });

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

//spin up a new process (child process) to delegate