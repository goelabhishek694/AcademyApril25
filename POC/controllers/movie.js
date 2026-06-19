import movies from '../models/movies.js';

export const getAllMovies = (req, res) => {
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
}

export const getMovieById = (req, res) => {
    const {id} = req.params;
    console.log(id);

    const movie = movies.find((movieObj)=> movieObj.id == id);
    
    res.json({
        success: true,
        message: "movies fetched successfully",
        data: movie,
    });
}

export const createMovie = (req, res) => {
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
}

export const putMovie = (req, res) => {
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
}

export const patchMovie = (req, res) => {
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
}
