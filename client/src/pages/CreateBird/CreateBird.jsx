import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateBird.css';
import { Link, useNavigate } from 'react-router-dom';
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
        console.log('LOOKING FOR RESPONSE ----- >', res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        navigate('/');
      });
  };
  return (
    <>
      <Link to="/">Home</Link>
      <h1 id="create-header">Log a Bird Sighting</h1>
      <form id="create-form" onSubmit={handleSubmit}>
        <input
          id="birdName"
          type="text"
          placeholder="Bird Name"
          value={birdName}
          onChange={(e) => setBirdName(e.target.value)}
        />
        <input
          id="scientificName"
          type="text"
          placeholder="Scientific Name"
          value={scientificName}
          onChange={(e) => setScientificName(e.target.value)}
        />
        <textarea
          id="notes"
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {/* Ensure the button is of type submit to semantically indicate its purpose */}
        <button type="submit">CREATE</button>
      </form>
    </>
  );
}
