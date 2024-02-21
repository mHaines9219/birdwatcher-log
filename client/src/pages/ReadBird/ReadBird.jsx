import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ReadBird.css';
export default function ReadBird() {
  const { id } = useParams();
  const [currentBird, setCurrentBird] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5001/birds/details/${id}`)
      .then((res) => {
        setCurrentBird(res.data.birdById); // Set the single bird's details
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Add id as a dependency

  return (
    <>
      <div className="read-page-container">
        <div>
          <div id="bird-name">{currentBird.name}</div>
          <div id="bird-sci-name">{currentBird.scientificName}</div>
          <div id="bird-notes">{currentBird.notes}</div>
          <div className="link-container">
            <Link to={`/birds/details/update/${id}`}>Edit</Link>
            <Link to={`/birds/details/delete/${id}`}>Delete</Link>
            <Link to={`/`}>Home</Link>
          </div>
        </div>
      </div>
    </>
  ); // Display property of the single bird
}
