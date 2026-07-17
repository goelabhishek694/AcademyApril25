// there can be certain tasks that are CPU intensive like image processing, video encoding, etc.
//we will take example of fibonacci series -> fib(23) = fib(22) + fib(21)

const express = require("express");
const app = express();

function calculateFibonacci(n) {
    if(n<=1) return n;
    return calculateFibonacci(n-1) + calculateFibonacci(n-2);
}

app.use(express.static("public"));

app.get("/fib", (req, res) => {
    const {number, requestNumber} = req.query;
    console.log("handler fn ran for req", requestNumber);
    if(!number || isNaN(number)) {
        return res.status(400).send("Invalid number");
    }
    const answer = calculateFibonacci(number);
    res.status(200).json({
        status: "success",
        message: `Fibonacci of ${number} is ${answer}`,
        requestNumber,
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});