function calculateFibonacci(n) {
    if(n<=1) return n;
    return calculateFibonacci(n-1) + calculateFibonacci(n-2);
}

//invoking this on process.on and event name
process.on("message", ({number}) => {
    const result = calculateFibonacci(number);
    process.send(result);
});

