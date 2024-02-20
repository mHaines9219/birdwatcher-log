import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
export default function DeleteBird() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5001/birds/details/delete/${id}`)
      .then(() => {
        alert('Bird Deleted');
        navigate('/');
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
