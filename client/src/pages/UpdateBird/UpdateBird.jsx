import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './UpdateBird.css';
import Home from '../Home/Home';
import HomeIconComp from '../../components/HomeIconComp';
import path from 'path';

export default function UpdateBird() {
  const [birdName, setBirdName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Add imageUrl state
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = (e) => {
    e.preventDefault();
    console.log('Edit handler called');

    const formData = new FormData();
    formData.append('name', birdName);
    formData.append('scientificName', scientificName);
    formData.append('notes', notes);
    formData.append('imageUrl', imageUrl);

    axios
      .put(`http://localhost:5001/birds/details/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        console.log('Bird Updated');
        navigate(`/birds/details/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   console.log('Edit handler called');
  //   // Prevent the default form submission behavior
  //   axios
  //     .put(`http://localhost:5001/birds/details/update/${id}`, {
  //       name: birdName,
  //       scientificName: scientificName,
  //       notes: notes,
  //       imageUrl: imageUrl,
  //     })
  //     .then(() => {
  //       console.log('Bird Updated');
  //       navigate(`/birds/details/${id}`);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <div className="top-page">
        <Link to="/">
          <HomeIconComp />
        </Link>
        <h1 id="update-header">UPDATE ENTRY</h1>
      </div>
      <form id="update-form" onSubmit={handleEdit}>
        {' '}
        {/* Change here */}
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
        <input
          id="notes"
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          // Assuming you have a state hook for notes like the others
        />
        <input
          type="file"
          name="imageUrl"
          onChange={(e) => setImageUrl(e.target.files[0])}
        />
        <button type="submit">UPDATE</button> {/* Change here */}
      </form>
    </>
  );
}
