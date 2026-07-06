import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Partner from './pages/Partner';
import User from './pages/User';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'
import "antd/dist/reset.css";
import ProtectedRoute from './components/ProtectedRoute';
import TheatreShows from './pages/TheatreShows';
import MovieDetails from './pages/MovieDetails';
import BookShow from './pages/BookShow';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/partner' element={<ProtectedRoute><Partner /></ProtectedRoute>} />
        <Route path='/user' element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/partner/theatres/:theatreId/shows" element={<ProtectedRoute><TheatreShows/></ProtectedRoute>}></Route>
        <Route path="/movie/:movieId" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}></Route>
        <Route path="/book-show/:showId" element={<ProtectedRoute><BookShow/></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
