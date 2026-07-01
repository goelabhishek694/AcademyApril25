import React, {useState, useEffect} from 'react'
import {message, Table, Button} from 'antd';
import {getAllMovies} from '../api/movies';
import MovieForm from './MovieForm';

function MovieList() {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [open,setOpen] = useState(false);

    const handleAddMovie = () => {
        setOpen(true);
    }
    const fetchMovies = async() =>{
        try{
            setLoading(true);
            const response = await getAllMovies();
            console.log("response", response);
            setMovies(response.data);
        }catch(err){
            message.error(err.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    const columns = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, record) => {
                return <img src={record.poster} alt="movie poster" width="70" />
            }
        },
        {
            title: "Movie Name",
            dataIndex: "title"
        },
        {
            title: "Description",
            dataIndex: "description",
            ellipsis: true,
        },
        {
            title: "Duration",
            dataIndex: "duration",
            render: (text, record) => `${record.duration} mins`
        },
        {
            title: "Genre",
            dataIndex: "genre"
        },
        {
            title: "Language",
            dataIndex: "language"
        },
        {
            title: "Date",
            dataIndex: "date"
        },
    ]
  return (
    <div>
      <div>
        <Button type="primary" onClick={handleAddMovie}>Add Movie</Button>
        <MovieForm open={open} setOpen={setOpen} onSuccess={fetchMovies}/>
      </div>

      <Table columns={columns} dataSource={movies} rowKey="_id" loading={loading} />
    </div>
  )
}

export default MovieList
