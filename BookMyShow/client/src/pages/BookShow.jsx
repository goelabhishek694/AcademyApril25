import React from 'react'
import { useParams } from 'react-router-dom';

function BookShow() {
    const {showId} = useParams();
  return (
    <div>
      <h2>Book Show</h2>
      <p>ShowId: {showId}</p>
      <p> seat selection will be implemented in next class</p>
    </div>
  )
}

export default BookShow
