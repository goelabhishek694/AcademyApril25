const express = require('express');
const app = express();
const PORT = 3000;

// Express does not read JSON by default
// Request body comes as raw data
// We must explicitly tell Express:
// “Please parse JSON bodies”
//this function is a middleware. this code is going to run for each req 
app.use(express.json());

//[ method , url(endpoint), handler function ] -> API 
app.get("/healthy",handleHealthCheck);

// req-> url , method, headers, body 
//res -> 
function handleHealthCheck(req, res){
    res.json({
        success: true,
        message: "server is healthy",
        timestamp: new Date().toISOString(),
    })
}

// before we understand debugger, we need to understand server-side data 
// this array lives on server 
// it is not visible to client
// If we restart the server , items are reset
// this behaves like a temp db
let items = [
    {id: 1, name: "Item 1"},
    {id: 2, name: "Item 2"},
    {id: 3, name: "Item 3"},
];


app.get("/items", (req,res) => {
    res.json({
        success: true,
        data: items
    })
});

// localhost:3000/health -> GET 

app.post("/items", (req,res) => { 
    console.log(req.body);
    const newItem = req.body;
    items.push(newItem);
    res.json({
        success: true,
        message: "item received",
        data: newItem
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

