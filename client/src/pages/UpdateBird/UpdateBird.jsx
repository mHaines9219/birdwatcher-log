import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
export default function UpdateBird() {
  const [birdName, setBirdName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    axios
      .put(`http://localhost:5001/birds/details/update/${id}`, {
        name: birdName,
        scientificName: scientificName,
      })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>Update</div>
      <form onSubmit={handleEdit}>
        <input
          id="birdName"
          type="text"
          value={birdName}
          onChange={(e) => setBirdName(e.target.value)}
        ></input>{' '}
        <input
          id="birdName"
          type="text"
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
        ></input>{' '}
        <button onClick={handleEdit}>Button</button>
      </form>
    </>
  );
}
