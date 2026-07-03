import React, { useState, useEffect } from "react";
import { message, Table, Button, Popconfirm } from "antd";
import { getAllMovies } from "../api/movies";
import MovieForm from "./MovieForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { deleteMovie } from "../api/movies";

function MovieList() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleAddMovie = () => {
    setSelectedMovie(null);
    setOpen(true);
  };

  const handleDelete = async (movie) => {
    try{
        setLoading(true);
        const response = await deleteMovie(movie._id);
        if(response.success){
            message.success("Movie deleted successfully");
            fetchMovies();
        }else{
            message.error(response.message);
        }
        setLoading(false);
    }catch(err){
        setLoading(false);
        message.error(err.message);
    }

  }
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getAllMovies();
      console.log("response", response);
      setMovies(response.data);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return <img src={record.poster} alt="movie poster" width="70" />;
      },
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text, record) => `${record.duration} mins`,
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedMovie(record);
                setOpen(true);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Delete this movie?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
            onConfirm={() => handleDelete(record)}
          >
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div>
        <Button type="primary" onClick={handleAddMovie}>
          Add Movie
        </Button>
        <MovieForm
          open={open}
          setOpen={setOpen}
          onSuccess={fetchMovies}
          selectedMovie={selectedMovie}
        />
      </div>

      <Table
        columns={columns}
        dataSource={movies}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
}

export default MovieList;
