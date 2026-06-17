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

let movies = [
    { id: 1, title: "Inception", "lang":"EN", rating: 4.5 },
    { id: 2, title: "Dangal", "lang":"EN", rating: 5 },
    { id: 3, title: "Interstellar",  "lang":"hindi", rating: 6.5 },
  ];

app.get("/api/movies",(req,res) => {
    const {lang,rating, searchString}= req.query;
    if(lang){
        movies = movies.filter(movieObj=>movieObj.lang.toLowerCase() == lang.toLowerCase());
    }

    if(rating){
        movies = movies.filter(movieObj=> movieObj.rating >= rating );
    }

    if(searchString){
        movies = movies.filter(movieObj => movieObj.title.includes(searchString));
    }

    
    res.json({
        success: true,
        message: "movies fetched successfully",
        data:movies
    });
});

// app.get("/api/movies/:movieId",(req,res) => {
//     const id = req.params.movieId;
//     console.log(id);
    
//     res.json({
//         success: true,
//         message: "movie fetched successfully",
//         data:{id: id, name: `Movie ${id}`},
//     });
// });



  app.get("/api/movies/:id",(req,res) => {
    const {id} = req.params;
    console.log(id);

    const movie = movies.find((movieObj)=> movieObj.id == id);
    
    res.json({
        success: true,
        message: "movies fetched successfully",
        data: movie,
    });
  });

  app.post("/api/movies",(req,res) => {
    const newMovie ={
        id: movies.length+1,
        title: req.body.title,
        lang: req.body.lang,
        rating: req.body.rating,
    }
    movies.push(newMovie);
    res.json({
        success: true,
        message: "movie created successfully",
        data: newMovie,
    });
  });

  app.put("/api/movies/:id",(req,res) => {
    const {id} = req.params;
    const {title,lang,rating} = req.body;

    const movieIdx = movies.findIndex(movieObj=>movieObj.id==id);

    if(movieIdx == -1){
        return res.status(404).json({
            success: false,
            message: "Movie not found"
        });
    }

    movies[movieIdx] = {
        ...movies[movieIdx],
        title,
        lang,
        rating,
    }

    res.send({
        success: true,
        data: movies[movieIdx],
    });

  });

  app.patch("/api/movies/:id",(req,res) => {
    const {id} = req.params;
    const {title,lang,rating} = req.body;
    const movieIdx = movies.findIndex(movieObj=>movieObj.id==id);

    if(movieIdx == -1){
        return res.status(404).json({
            success: false,
            message: "Movie not found"
        });
    }

    if(title) movies[movieIdx].title = title;   
    if(lang) movies[movieIdx].lang = lang;
    if(rating) movies[movieIdx].rating = rating;

    res.json({
        success: true,
        message: "movie updated successfully",
        data: movies[movieIdx],
    });
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

