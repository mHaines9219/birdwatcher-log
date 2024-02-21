import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateBird.css';
import { useNavigate } from 'react-router-dom';
export default function CreateBird() {
  const [birdName, setBirdName] = useState('');
  const [scientificName, setScientificName] = useState('');

  const [notes, setNotes] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5001/birds/create', {
        name: birdName,
        scientificName: scientificName,
        notes: notes,
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
          placeholder="Bird Name"
          value={birdName}
          onChange={(e) => setBirdName(e.target.value)}
        ></input>{' '}
        <input
          id="scientificName"
          type="text"
          placeholder="Scientific Name"
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
        ></input>{' '}
        <input
          id="notes"
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></input>{' '}
        <button onClick={handleSubmit}>Button</button>
      </form>
    </>
  );
}
