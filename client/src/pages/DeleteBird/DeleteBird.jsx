import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function DeleteBird(setBirds, birds) {
  const { id } = useParams();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5001/birds/details/delete/${id}`)
      .then(() => {
        alert('Bird Deleted'); // Set the single bird's details
      })

      .catch((err) => {
        console.log(err);
      });
  }; // Add id as a dependency

  return (
    <div>
      are you sure you want to delete?
      <button onClick={handleDelete}>Yes</button>
    </div>
  );
}
