const myEventEmitter = require("events");
const myEmitter = new myEventEmitter();

//listener
myEmitter.on("greet", (name) => {
    console.log(`Hello ${name}`);
});

//second listener
myEmitter.on("greet", (name) => {
    console.log(`Hello ${name} again`);
});

//emit an event
myEmitter.emit("greet", "Mustafa");
myEmitter.emit("greet", "Madhan");
