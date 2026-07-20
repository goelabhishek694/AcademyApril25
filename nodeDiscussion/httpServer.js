const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("request received");
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);


    if(req.method === "GET"){
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.write("hello world");
        res.end();
    }else if(req.method === "POST"){
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({
            message: "Hello People"
        }));
        res.end();
    }

   
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

