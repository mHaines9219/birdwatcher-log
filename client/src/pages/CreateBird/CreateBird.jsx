import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateBird.css';
import { useNavigate } from 'react-router-dom';
export default function CreateBird() {
  const [birdName, setBirdName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5001/birds/create', {
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
      <div>Create</div>
      <form onSubmit={handleSubmit}>
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
        <button onClick={handleSubmit}>Button</button>
      </form>
    </>
  );
}
